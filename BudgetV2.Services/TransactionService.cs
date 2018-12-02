namespace BudgetV2.Services
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using BudgetV2.Data;
    using BudgetV2.Data.Models;
    using BudgetV2.Data.Models.Enums;
    using BudgetV2.Services.Contracts;
    using BudgetV2.Services.Models.Transaction;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class TransactionService : ITransactionService
    {
        private readonly BudgetDbContext context;
        private readonly IUserService userService;
        private readonly IMapper mapper;

        public TransactionService(
            BudgetDbContext context,
            IMapper mapper,
            IUserService userService)
        {
            this.context = context;
            this.mapper = mapper;
            this.userService = userService;
        }

        public async Task<IEnumerable<TransactionServiceModel>> GetAllByUserIdAsync(string userId)
        {
            var transactions = await this.context
                .Transactions
                .Where(t => t.UserId == userId)
                .ProjectTo<TransactionServiceModel>(mapper.ConfigurationProvider)
                .ToListAsync();

            return transactions;
        }

        public async Task<bool> AddTransactionAsync(decimal amount, string userId, int categoryId, string description, TransactionType type)
        {
            var transaction = new Transaction
            {
                Amount = amount,
                UserId = userId,
                CategoryId = categoryId,
                Date = DateTime.UtcNow,
                Description = description
            };
            
            var result = await this.context.Transactions.AddAsync(transaction);
            var balance = await this.userService.AddUserBalanceAsync(userId, amount);

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteTransactionAsync(int transactionId)
        {
            var transaction = await this.context.Transactions
                .Where(t => t.Id == transactionId)
                .Select(t => new Transaction
                {
                    Id = t.Id,
                    Amount = t.Amount,
                    UserId = t.UserId,
                    Date = t.Date,
                    Category = t.Category
                })
                .FirstOrDefaultAsync();

            if (transaction == null)
            {
                throw new InvalidOperationException("The transaction does not exist.");
            }

            var transactionAmount = transaction.Amount;
            var user = await this.context.Users.FirstOrDefaultAsync(u => u.Id == transaction.UserId);
            if (user == null)
            {
                throw new InvalidOperationException($"There is not existing user with id: {user.Id}.");
            }

            user.Balance = transaction.Category.TransactionType == TransactionType.Income ? user.Balance -= transactionAmount: user.Balance += transactionAmount;

            var balance = await this.userService.SubtractUserBalanceAsync(transaction.UserId, transaction.Amount);//TODO: DONT WORK!
            this.context.Transactions.Remove(transaction);
            return await this.context.SaveChangesAsync() > 0;
        }
    }
}
