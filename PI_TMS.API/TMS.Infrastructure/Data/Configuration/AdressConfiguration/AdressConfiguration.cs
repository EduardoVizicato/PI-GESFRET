using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TMS.Domain.Entities;

namespace TMS.Infrastructure.Data.Configuration.AdressConfiguration;

public class AdressConfiguration : IEntityTypeConfiguration<Adress>
{
    public void Configure(EntityTypeBuilder<Adress> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.City)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(x => x.State)
            .IsRequired()
            .HasMaxLength(2);
        
        builder.Property(x => x.Street)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(x => x.AdressNumber)
            .IsRequired()
            .HasMaxLength(10);
        
        builder.Property(x => x.PostalCode)
            .IsRequired()
            .HasMaxLength(8);
    }
}