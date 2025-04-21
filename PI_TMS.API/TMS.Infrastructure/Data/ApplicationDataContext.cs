using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;
using TMS.Domain.Entities;

namespace TMS.Infrastructure.Data
{
    public class ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Load> Loads { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Travel> Travels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDataContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
