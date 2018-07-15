namespace BudgetV2.Api.Controllers
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;
    using BudgetV2.Data.Models;
    using System.Threading.Tasks;
    using BudgetV2.Services.Contracts;
    using BudgetV2.Services.Models;
    using AutoMapper;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;

    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;

        public ValuesController(UserManager<User> userManager, ICategoryService categoryService, IMapper mapper)
        {
            this.userManager = userManager;
            this.categoryService = categoryService;
            this.mapper = mapper;
        }

        // GET api/values
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "ApiUser")]
        public async Task<IEnumerable<CategoryInfoServiceModel>> Get()
        {
            var categories = await this.categoryService.GetAllCategoriesInfo();

            return categories;
        }
    }
}
