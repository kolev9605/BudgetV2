using System;

namespace BudgetV2.Infrastructure.Common
{
    [Serializable]
    public class BudgetValidationException : Exception
    {
        public BudgetValidationException(string message) : base(message)
        {
        }

        public BudgetValidationException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
