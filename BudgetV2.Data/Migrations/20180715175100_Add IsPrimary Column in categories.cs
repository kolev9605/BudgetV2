using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetV2.Data.Migrations
{
    public partial class AddIsPrimaryColumnincategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPrimary",
                table: "Categories",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPrimary",
                table: "Categories");
        }
    }
}
