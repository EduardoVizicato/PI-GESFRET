using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;

namespace TMS.Infrastructure.Data.Configuration.ClientConfiguration
{
    internal class ClientEntityConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.HasKey(x => x.Id);
            
            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);
            
            builder.Property(x => x.IdentificationNumber)
                .IsRequired();
            
            builder.Property(x => x.Address)
                .IsRequired()
                .HasMaxLength(200);
            
            builder.Property(x => x.PhoneNumber)
                .IsRequired();
            
            builder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(200);
        }
    }
}
