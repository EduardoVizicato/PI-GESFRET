using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;
using TMS.Domain.Entities;

namespace TMS.Infrastructure.Data.Configuration.LoadConfiguration
{
    internal class LoadEntityConfiguration : IEntityTypeConfiguration<Load>
    {
        public void Configure(EntityTypeBuilder<Load> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(x => x.Quantity)
                .IsRequired();

            builder.Property(x => x.Type)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
    
}

