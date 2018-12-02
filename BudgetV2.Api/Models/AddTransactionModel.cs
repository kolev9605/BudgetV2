using BudgetV2.Data.Models.Enums;

namespace BudgetV2.Api.Models
{
    public class AddTransactionModel
    {
        public decimal Amount { get; set; }

        public string UserId { get; set; }

        public int CategoryId { get; set; }

        public string Description { get; set; }

        public TransactionType TransactionType { get; set; }
    }
}
