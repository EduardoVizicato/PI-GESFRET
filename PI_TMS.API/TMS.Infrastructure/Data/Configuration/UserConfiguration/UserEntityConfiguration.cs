using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entities;
using TMS.Domain.ValueObjects;

namespace TMS.Infrastructure.Data.Configuration.UserConfiguration
{
    internal class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.Id)
                .HasColumnType("uniqueidentifier")
                .IsRequired();

            builder.Property(x => x.FirstName)
                .IsRequired()
                .HasColumnName("FirstName")
                .HasMaxLength(50);

            builder.Property(x => x.LastName)
                .IsRequired()
                .HasColumnName("LastName")
                .HasMaxLength(50);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasColumnName("Email")
                .HasConversion(email => email.Value, value => new EmailVO(value));

            builder.Property(x => x.Password)
                .IsRequired()
                .HasConversion(password => password.Value, value => new PasswordVO(value))
                .HasColumnName("Password");

            builder.Property(x => x.PhoneNumber)
                .IsRequired()
                .HasColumnName("Phone")
                .HasConversion(phone => phone.Value, value => new PhoneVO(value));

            builder.Property(x => x.TaxId)
                .IsRequired()
                .HasColumnName("TaxID")
                .HasConversion(taxId => taxId.Value, value => new TaxIdVO(value));

            builder.Property(x => x.UserRole)
                .HasColumnName("UserRole");

        }
    }
}
