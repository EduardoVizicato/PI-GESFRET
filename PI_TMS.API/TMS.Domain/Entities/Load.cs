using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;

namespace TMS.Domain.Entities
{
    public class Load : BaseEntity
    {
        public Load()
        {
            
        }
        public Load(string description, float quantity, string type, Guid clientId, Client client)
        {
            Description = description;
            Quantity = quantity;
            Type = type;
            ClientId = clientId;
            Client = client;
        }

        public string Description { get; private set; }
        public float Quantity { get; private set; }
        public string Type { get; private set; }
        public Guid ClientId { get; private set; }
        public Client Client { get; private set; }

        public void Updateload(string description, float quantity, string type, Guid clientId, Client client)
        {
            Description = description;
            Quantity = quantity;
            Type = type;
            ClientId = clientId;
        }
}
}
