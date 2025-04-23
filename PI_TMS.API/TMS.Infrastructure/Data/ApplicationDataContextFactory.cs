using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TMS.Infrastructure.Data;

public class ApplicationDataContextFactory : IDesignTimeDbContextFactory<ApplicationDataContext>
{
    public ApplicationDataContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDataContext>();

        optionsBuilder.UseSqlite("Data Source = TMS_BD");
        
        return new ApplicationDataContext(optionsBuilder.Options);
    }
}