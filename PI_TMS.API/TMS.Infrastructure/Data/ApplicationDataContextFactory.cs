using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TMS.Infrastructure.Data;

public class ApplicationDataContextFactory : IDesignTimeDbContextFactory<ApplicationDataContext>
{
    public ApplicationDataContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDataContext>();

<<<<<<< HEAD
        optionsBuilder.UseSqlServer("Server=NOTE-FELIPE76;Database=PI-TMS;User ID=sa;Password=22072006;TrustServerCertificate=True;");
=======
        optionsBuilder.UseSqlServer("Data Source=loqfelipe;Initial Catalog=PI-TMS;User ID=sa;Password=felipao2510;TrustServerCertificate=True;");
>>>>>>> main
        
        return new ApplicationDataContext(optionsBuilder.Options);
    }
}