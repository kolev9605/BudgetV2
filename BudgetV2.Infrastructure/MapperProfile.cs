namespace BudgetV2.Infrastructure
{
    using AutoMapper;
    using BudgetV2.Data.Models;
    using BudgetV2.Services.Models;

    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            this.CreateMap<Transaction, TransactionServiceModel>();
            this.CreateMap<Category, CategoryInfoServiceModel>();
        }
    }
}
