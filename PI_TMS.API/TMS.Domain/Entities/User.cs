using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;
using TMS.Domain.Entities.Common.Enums;

namespace TMS.Domain.Entities
{
    public class User : BaseEntity
    {
        public User(string firstName, string lastName, string email, string password, int identificationNumber, int phoneNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            IdentificationNumber = identificationNumber;
            PhoneNumber = phoneNumber;
        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public int IdentificationNumber { get; private set; }
        public int PhoneNumber { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        
        public UserRole UserRole { get; set; } = UserRole.Client;
        public void UpdateUser(string firstName, string lastName, string email, int identificationNumber, int phoneNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            IdentificationNumber = identificationNumber;
            PhoneNumber = phoneNumber;
        }
    }
}
