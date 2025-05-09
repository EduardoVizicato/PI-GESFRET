using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;
using TMS.Domain.Entities.Common.Enums;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entities
{
    public class User : BaseEntity
    {
        public User(string firstName, string lastName, EmailVO email, PasswordVO password, TaxIdVO taxId, PhoneVO phoneNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            TaxId = taxId;
            PhoneNumber = phoneNumber;
            
        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public TaxIdVO TaxId { get; private set; }
        public PhoneVO PhoneNumber { get; private set; }
        public EmailVO Email { get; set; }
        public PasswordVO Password { get; private set; }
        
        public UserRole UserRole { get; set; }
        
        public void UpdateUser(string firstName, string lastName, EmailVO email, TaxIdVO taxId, PhoneVO phoneNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            TaxId = taxId;
            PhoneNumber = phoneNumber;
        }
    }
}
