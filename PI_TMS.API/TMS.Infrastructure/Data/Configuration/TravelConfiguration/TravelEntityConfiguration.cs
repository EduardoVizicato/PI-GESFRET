using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;
using TMS.Domain.Entities;

namespace TMS.Infrastructure.Data.Configuration.TravelConfiguration
{
    internal class TravelEntityConfiguration : IEntityTypeConfiguration<Travel>
    {
        public void Configure(EntityTypeBuilder<Travel> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.TravelName)
                .IsRequired()
                .HasMaxLength(100);
            
            builder.Property(x => x.StartDate)
                .IsRequired();
            
            builder.Property(x => x.EndDate)
                .IsRequired();
            
            builder.Property(x => x.DateCreate)
                .IsRequired();
            
            builder.Property(x => x.DepartureLocation)
                .IsRequired()
                .HasMaxLength(200);
            
            builder.Property(x => x.ArrivalLocation)
                .IsRequired()
                .HasMaxLength(200);
            
            builder.Property(x => x.Weight)
                .IsRequired();
            
            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(200);
            
            builder.Property(x => x.LoadGuid)
                .IsRequired();
        }
    }
}
