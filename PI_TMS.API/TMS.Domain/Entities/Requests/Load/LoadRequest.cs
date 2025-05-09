using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entites.Requests.Load
{
    public class LoadRequest
    {
        public DescriptionVO Description { get; set; }
        public float Quantity { get; set; }
        public TypeVO Type { get; set; }
    }
}
