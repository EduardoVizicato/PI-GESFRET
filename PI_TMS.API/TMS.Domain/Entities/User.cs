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
        public User(string firstName, string lastName, string email, string password, string identificationNumber, string phoneNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            IdentificationNumber = identificationNumber;
            PhoneNumber = phoneNumber;

            if(email.Length ==0)
                throw new ArgumentException(....)
        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string TaxId { get; private set; }
        public PhoneVO PhoneNumber { get; private set; }
        public Email Email { get;}
        public string Password { get; private set; }
        
        public UserRole UserRole { get; set; } = UserRole.Client;
        
        public void UpdateUser(string firstName, string lastName, string email, string identificationNumber, string phoneNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            IdentificationNumber = identificationNumber;
            PhoneNumber = phoneNumber;
        }
    }
}
