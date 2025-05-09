using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entities
{
    public class Load : BaseEntity
    {
        public Load()
        {
            
        }
        public Load(DescriptionVO description, float quantity, string type)
        {
            Description = description;
            Quantity = quantity;
            Type = type;

        }

        public DescriptionVO Description { get; private set; }
        public float Quantity { get; private set; }
        public string Type { get; private set; }
        
        public User User { get; set; }
        public void Updateload(DescriptionVO description, float quantity, string type)
        {
            Description = description;
            Quantity = quantity;
            Type = type;
        }
}
}
