using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Domain.Entites.Responses.Travel
{
    internal class TravelResponse
    {
        public string TravelName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime DateCreate { get; set; }
        public string DepartureLocation { get; set; }
        public string ArrivalLocation { get; set; }
        public float Weight { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public Guid LoadGuid { get; set; }
    }
}
