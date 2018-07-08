namespace BudgetV2.Services.Contracts
{
    using BudgetV2.Data.Models.Enums;
    using BudgetV2.Services.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICategoryService
    {
        Task<IEnumerable<CategoryInfoServiceModel>> GetAllUserCategoriesByTypeAsync(string userId, TransactionType transactionType);

        Task<TransactionType> GetTransactionTypeByCategoryIdAsync(int categoryId);

        Task<int> AddOrGetCategoryAsync(string name, TransactionType type, string rgbColor, string userId = null);

        Task<bool> DeleteUserCategoryAsync(int categoryId, string userId);

        Task<IEnumerable<CategoryInfoServiceModel>> GetAllCategoriesInfo();

        IEnumerable<string> GetAllCategoryColors();
    }
}
