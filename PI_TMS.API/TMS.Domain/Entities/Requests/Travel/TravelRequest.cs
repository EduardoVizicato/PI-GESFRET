using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entities;
using TMS.Domain.Entities.Enums;

namespace TMS.Domain.Entites.Requests.Travel
{
    public class TravelRequest
    {
        public string TravelName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public TravelStatus TravelStatus { get; set; }
        public Adress DepartureLocation { get; set; }
        public Adress ArrivalLocation { get; set; }
        public float Weight { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }

        public Guid LoadGuid { get; set; }
    }
}
