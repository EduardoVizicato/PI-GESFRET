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
        public Load(string description, float quantity, string type)
        {
            Description = description;
            Quantity = quantity;
            Type = type;

        }

        public string Description { get; private set; }
        public float Quantity { get; private set; }
        public string Type { get; private set; }
        
        public User User { get; set; }
        public void Updateload(string description, float quantity, string type)
        {
            Description = description;
            Quantity = quantity;
            Type = type;
        }
}
}
