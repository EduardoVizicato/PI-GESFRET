using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Domain.ValueObjects
{
    public class PhoneVO
    {
        public PhoneVO(string phone)
        {
            if (string.IsNullOrEmpty(phone) || phone.Length != 11)
            {
                throw new InvalidExpressionException("The phone number is invalid.");
            }
            Phone = phone;
        }
        public string Phone { get; }
    }
}