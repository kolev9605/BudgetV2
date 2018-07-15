using BudgetV2.Data;
using BudgetV2.Data.Models;
using BudgetV2.Data.Models.Enums;
using BudgetV2.Infrastructure.ColorGenerator;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;

namespace BudgetV2.Api.Helpers
{
    public static class DatabaseSeeder
    {
        public static void SeedDatabase(BudgetDbContext context, IColorGenerator colorGenerator)
        {
            context.Database.EnsureCreated();
            if (!context.Categories.Any())
            {
                context.Categories.AddRange(GetCategoriesToSeed(colorGenerator));

                context.SaveChanges();
            }
        }

        private static IEnumerable<Category> GetCategoriesToSeed(IColorGenerator colorGenerator)
        {
            var categories = new List<Category>
            {
                new Category
                {
                    Name = "Salary",
                    TransactionType = TransactionType.Income,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Deposit",
                    TransactionType = TransactionType.Income,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Savings",
                    TransactionType = TransactionType.Income,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Bills",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Car",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Transport",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Education",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Sports",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Food",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Home",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Eating out",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Personal",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                },
                new Category
                {
                    Name = "Health",
                    TransactionType = TransactionType.Expense,
                    IsPrimary = true,
                    RgbColorValue = colorGenerator.GetColor()
                }
            };

            return categories;
        }
    }
}
