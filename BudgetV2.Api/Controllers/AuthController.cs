namespace BudgetV2.Api.Controllers
{
    using BudgetV2.Api.Authentication;
    using BudgetV2.Api.Authentication.Contracts;
    using BudgetV2.Api.Helpers;
    using BudgetV2.Api.Models;
    using BudgetV2.Data.Models;
    using BudgetV2.Services.Contracts;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Newtonsoft.Json;
    using System.Security.Claims;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IJwtFactory jwtFactory;
        private readonly JwtIssuerOptions jwtOptions;
        private readonly ICategoryService categoryService;

        public AuthController(
            UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            ICategoryService categoryService,
            IJwtFactory jwtFactory, 
            IOptions<JwtIssuerOptions> jwtOptions)
        {
            this.userManager = userManager;
            this.jwtFactory = jwtFactory;
            this.jwtOptions = jwtOptions.Value;
            this.signInManager = signInManager;
            this.categoryService = categoryService;
        }

        //POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginModel loginViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(loginViewModel.Username, loginViewModel.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(identity, this.jwtFactory, loginViewModel.Username, this.jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });

            return new OkObjectResult(jwt);
        }

        //POST api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody]RegisterModel registerViewModel)
        {
            if (ModelState.IsValid)
            {
                var user = new User { UserName = registerViewModel.Username, Email = registerViewModel.Username };
                var result = await userManager.CreateAsync(user, registerViewModel.Password);
                if (result.Succeeded)
                {
                    await this.categoryService.SavePrimaryCategoriesAsync(user.Id);
                    
                    return Ok();
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }

            return BadRequest(ModelState);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            //get the user to verifty
            var userToVerify = await this.userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            //check the credentials
            if (await this.userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(this.jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            //Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
