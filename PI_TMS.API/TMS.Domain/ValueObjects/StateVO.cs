using System.Data;
using System.Text.RegularExpressions;
using Abp.Domain.Values;
using Abp.Extensions;

namespace TMS.Domain.ValueObjects;

public class StateVO
{
    public StateVO(string state)
    {
        if (string.IsNullOrEmpty(state) || state.Length != 2)
            throw new InvalidExpressionException("Invalid State");
        
        State = state;
    }
    public string Value => State;
    public string State { get; }
}