using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class NewDishhIngridient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DishId",
                table: "DishIngredient");

            migrationBuilder.DropColumn(
                name: "IngredientId",
                table: "DishIngredient");

            migrationBuilder.AddColumn<string>(
                name: "DishName",
                table: "DishIngredient",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IngredientName",
                table: "DishIngredient",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DishName",
                table: "DishIngredient");

            migrationBuilder.DropColumn(
                name: "IngredientName",
                table: "DishIngredient");

            migrationBuilder.AddColumn<int>(
                name: "DishId",
                table: "DishIngredient",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IngredientId",
                table: "DishIngredient",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
