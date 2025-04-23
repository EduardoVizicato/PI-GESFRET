using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TMS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreatingAdress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArrivalLocation",
                table: "Travels");

            migrationBuilder.DropColumn(
                name: "DepartureLocation",
                table: "Travels");

            migrationBuilder.DropColumn(
                name: "ClientGuid",
                table: "Loads");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "LoadGuid",
                table: "Travels",
                newName: "DepartureLocationId");

            migrationBuilder.AddColumn<Guid>(
                name: "ArrivalLocationId",
                table: "Travels",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AdressId",
                table: "Clients",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Clients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Adresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Street = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    City = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    State = table.Column<string>(type: "TEXT", maxLength: 2, nullable: false),
                    PostalCode = table.Column<int>(type: "INTEGER", maxLength: 8, nullable: false),
                    AdressNumber = table.Column<int>(type: "INTEGER", maxLength: 10, nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adresses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Travels_ArrivalLocationId",
                table: "Travels",
                column: "ArrivalLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Travels_DepartureLocationId",
                table: "Travels",
                column: "DepartureLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Clients_AdressId",
                table: "Clients",
                column: "AdressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Adresses_AdressId",
                table: "Clients",
                column: "AdressId",
                principalTable: "Adresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Travels_Adresses_ArrivalLocationId",
                table: "Travels",
                column: "ArrivalLocationId",
                principalTable: "Adresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Travels_Adresses_DepartureLocationId",
                table: "Travels",
                column: "DepartureLocationId",
                principalTable: "Adresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Adresses_AdressId",
                table: "Clients");

            migrationBuilder.DropForeignKey(
                name: "FK_Travels_Adresses_ArrivalLocationId",
                table: "Travels");

            migrationBuilder.DropForeignKey(
                name: "FK_Travels_Adresses_DepartureLocationId",
                table: "Travels");

            migrationBuilder.DropTable(
                name: "Adresses");

            migrationBuilder.DropIndex(
                name: "IX_Travels_ArrivalLocationId",
                table: "Travels");

            migrationBuilder.DropIndex(
                name: "IX_Travels_DepartureLocationId",
                table: "Travels");

            migrationBuilder.DropIndex(
                name: "IX_Clients_AdressId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "ArrivalLocationId",
                table: "Travels");

            migrationBuilder.DropColumn(
                name: "AdressId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "DepartureLocationId",
                table: "Travels",
                newName: "LoadGuid");

            migrationBuilder.AddColumn<string>(
                name: "ArrivalLocation",
                table: "Travels",
                type: "TEXT",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DepartureLocation",
                table: "Travels",
                type: "TEXT",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "ClientGuid",
                table: "Loads",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Clients",
                type: "TEXT",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }
    }
}
