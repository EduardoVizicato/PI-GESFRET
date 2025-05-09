using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;

namespace TMS.Infrastructure.Data.Configuration.VehicleConfiguration
{
    internal class VehicleEntityConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("Name")
                .IsRequired();
            
            builder.Property(x => x.VehicleRegistrationPlate)
                .HasColumnName("VehicleRegistrationPlate")
                .IsRequired();

            builder.Property(x => x.VehicleType)
                .HasColumnName("VehicleType")
                .IsRequired();
        }
    }
}
