using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entities;

namespace TMS.Domain.Entites
{
    public class Client : BaseEntity
    {
        public Client()
        {
        }
        public Client(string name, string indetificationNumber, Adress adress, Guid adressId ,string phonenumber, string email, string password)
        {
            Name = name;
            IdentificationNumber = indetificationNumber;
            Address = adress;
            PhoneNumber = phonenumber;
            Email = email;
            Password = password;
            AdressId = adressId;
        }
        public string Name { get; private set; }
        public string IdentificationNumber { get; private set; }
        public Guid AdressId { get; private set; }
        public Adress Address { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }

        public void UpdateClient(string name, string indetificationNumber, Adress adress, string phonenumber, string email)
        {
            Name = name;
            IdentificationNumber = indetificationNumber;
            Address = adress;
            PhoneNumber = phonenumber;
            Email = email;
        }
    }
}
