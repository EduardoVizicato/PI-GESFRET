namespace TMS.Domain.ValueObjects;

public class DescriptionVO
{
    public DescriptionVO(string description)
    {
        if (string.IsNullOrEmpty(description))
            throw new ArgumentException("Value cannot be null", nameof(description));
        Description = description;
    }
    
    public string Description { get; }
}