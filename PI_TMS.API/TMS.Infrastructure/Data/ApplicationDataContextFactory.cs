using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TMS.Infrastructure.Data;

public class ApplicationDataContextFactory : IDesignTimeDbContextFactory<ApplicationDataContext>
{
    public ApplicationDataContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDataContext>();

        optionsBuilder.UseSqlite("Data Source = \"C:\\FATEC\\PI-TMS\\PI_TMS.API\\TMS.Infrastructure\\PI_TMS_BD.bd\"");
        
        return new ApplicationDataContext(optionsBuilder.Options);
    }
}