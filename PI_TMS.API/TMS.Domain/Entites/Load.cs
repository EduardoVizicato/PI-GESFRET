using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Domain.Entites
{
    internal class Load : BaseEntity
    {
        public string Description { get; set; }
        public float Quantity {get; set;}
        public string Type { get; set;}
        public bool IsActive { get; set; }
        public Guid ClientGuid { get; set; }
        public Client Client { get; set; }
    }
}
