using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TMS.Domain.Entities;
using TMS.Domain.ValueObjects;

namespace TMS.Infrastructure.Data.Configuration.AdressConfiguration;

public class AdressConfiguration : IEntityTypeConfiguration<Adress>
{
    public void Configure(EntityTypeBuilder<Adress> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.City)
            .IsRequired()
            .HasColumnName("City")
            .HasConversion(city => city.Value, value => new CityVO(value));
        
        builder.Property(x => x.State)
            .IsRequired()
            .HasColumnName("State")
            .HasConversion(state => state.Value, value => new StateVO(value));
        
        builder.Property(x => x.Street)
            .IsRequired()
            .HasColumnName("Street")
            .HasConversion(street => street.Value, value => new StreetVO(value));

        builder.Property(x => x.AdressNumber)
            .IsRequired()
            .HasColumnName("AdressNumber");
        
        builder.Property(x => x.PostalCode)
            .IsRequired()
            .HasColumnName("PostalCode")
            .HasConversion(postalCode => postalCode.Value, value => new PostalCodeVO(value));
    }
}