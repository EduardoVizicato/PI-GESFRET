using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TMS.Infrastructure.Data;

public class ApplicationDataContextFactory : IDesignTimeDbContextFactory<ApplicationDataContext>
{
    public ApplicationDataContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDataContext>();

        optionsBuilder.UseSqlServer("Data Source=PCEDUARDO\\SQLEXPRESS;Initial Catalog=PI-TMS;User ID=sa;Password=edu;TrustServerCertificate=True;");
        
        return new ApplicationDataContext(optionsBuilder.Options);
    }
}