namespace BudgetV2.Services.Models
{
    using BudgetV2.Data.Models.Enums;

    public class CategoryInfoServiceModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public TransactionType TransactionType { get; set; }

        public bool IsPrimary { get; set; }
    }
}
