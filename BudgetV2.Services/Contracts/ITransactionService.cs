namespace BudgetV2.Services.Contracts
{
    using BudgetV2.Data.Models.Enums;
    using BudgetV2.Services.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ITransactionService
    {
        Task<IEnumerable<TransactionServiceModel>> GetAllByUserIdAsync(string userId);

        Task<bool> AddTransactionAsync(decimal amount, string userId, int categoryId, string description, TransactionType type);

        Task<bool> DeleteTransactionAsync(int transactionId);
    }
}
