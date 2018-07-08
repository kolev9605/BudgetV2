using System.Threading.Tasks;

namespace BudgetV2.Services.Contracts
{
    public interface IUserService
    {
        Task<decimal?> GetUserBalanceAsync(string userId);
    }
}
