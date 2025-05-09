using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entities;
using TMS.Domain.Entities.Enums;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entites.Requests.Travel
{
    public class TravelRequest
    {
        public string TravelName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid DepartureLocationId { get; set; }
        public Adress DepartureLocation { get; set; }
        public Guid ArrivalLocationId { get; set; }
        public Adress ArrivalLocation { get; set; }
        public float Weight { get; set; }
        public float Price { get; set; }
        public DescriptionVO Description { get; set; }
        public Guid LoadId { get; set; }
        public Entities.Load Load { get; set; }
    }
}
