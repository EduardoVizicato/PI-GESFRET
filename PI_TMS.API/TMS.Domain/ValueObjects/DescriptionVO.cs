namespace TMS.Domain.ValueObjects;

public class DescriptionVO
{
    public DescriptionVO(string description)
    {
        if (string.IsNullOrEmpty(description) ||  description.Length > 200)
            throw new ArgumentException("Value cannot be null", nameof(description));
        Description = description;
    }
    public string Value => Description;
    public string Description { get; }
}