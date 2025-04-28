using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites;

namespace TMS.Domain.Entites.Requests.Load
{
    public class LoadRequest
    {
        public string Description { get; set; }
        public float Quantity { get; set; }
        public string Type { get; set; }
    }
}
