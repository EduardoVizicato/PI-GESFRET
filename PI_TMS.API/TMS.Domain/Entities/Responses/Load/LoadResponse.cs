using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entites.Responses.Load
{
    public class LoadResponse
    {
        public DescriptionVO Description { get; set; }
        public float Quantity { get; set; }
        public string Type { get; set; }
    }
}
