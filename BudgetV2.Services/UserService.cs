namespace BudgetV2.Services
{
    using System.Threading.Tasks;
    using BudgetV2.Services.Contracts;
    using BudgetV2.Data;
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Linq;
    using BudgetV2.Data.Models.Enums;

    public class UserService : IUserService
    {
        private readonly BudgetDbContext context;
        private readonly IMapper mapper;

        public UserService(
            BudgetDbContext context,
            IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<decimal?> GetUserBalanceAsync(string userId)
        {
            var user = await this.context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                throw new InvalidOperationException($"There is not existing user with id: {userId}.");
            }

            return user.Balance;
        }

        public async Task<decimal?> SubtractUserBalanceAsync(string userId, decimal amount, bool saveChanges = false)
            => await this.UpdateUserBalanceAsync(userId, amount * -1, saveChanges);

        public async Task<decimal?> AddUserBalanceAsync(string userId, decimal amount, bool saveChanges = false)
            => await this.UpdateUserBalanceAsync(userId,  amount, saveChanges);

        private async Task<decimal?> UpdateUserBalanceAsync(string userId, decimal amount, bool saveChanges = false)
        {
            var user = this.context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                throw new InvalidOperationException($"There is not existing user with id: {userId}.");
            }

            user.Balance += amount;
            if (user.Balance < 0)
            {
                throw new InvalidOperationException("There is not enough balance.");
            }

            if (saveChanges)
                await this.context.SaveChangesAsync();

            return user.Balance;
        }
    }
}
