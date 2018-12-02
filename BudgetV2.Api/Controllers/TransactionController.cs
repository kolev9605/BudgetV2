using AutoMapper;
using BudgetV2.Api.Models;
using BudgetV2.Data.Models;
using BudgetV2.Services.Contracts;
using BudgetV2.Services.Models;
using BudgetV2.Services.Models.Transaction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetV2.Api.Controllers
{
    [Route("api/[controller]")]
    public class TransactionController : Controller
    {
        private readonly ITransactionService transactionService;

        public TransactionController(
            ITransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "ApiUser")]
        public async Task<bool> Add(AddTransactionModel model)
        {
            var success = await this.transactionService.AddTransactionAsync(model.Amount, model.UserId, model.CategoryId, model.Description, model.TransactionType);
            return success;
        }
    }
}
