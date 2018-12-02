using System.Threading.Tasks;

namespace BudgetV2.Services.Contracts
{
    public interface IUserService
    {
        Task<decimal?> GetUserBalanceAsync(string userId);

        Task<decimal?> AddUserBalanceAsync(string userId, decimal amount, bool saveChanges = false);

        Task<decimal?> SubtractUserBalanceAsync(string userId, decimal amount, bool saveChanges = false);

    }
}
