using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entities;
using TMS.Domain.Entities.Enums;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entites
{
    public class Travel : BaseEntity
    {
        public Travel()
        {
            
        }
        public Travel(string travelName, 
            DateTime startDate, 
            DateTime endDate,
            Guid departureLocationId,
            Adress departureLocation,
            Guid arrivalLocationId,
            Adress arrivalLocation, 
            float weight,
            float price,
            DescriptionVO description,
            Guid loadId,
            Load load)
        {
            TravelName = travelName;
            StartDate = startDate;
            EndDate = endDate;
            DepartureLocation = departureLocation;
            ArrivalLocation = arrivalLocation;
            Weight = weight;
            Price = price;
            Description = description;
            Load = load;
        }
        public string TravelName { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public TravelStatus TravelStatus { get; private set; } = TravelStatus.Todo;
        public DateTime DateCreate { get; } = DateTime.Now;
        public Adress DepartureLocation { get; private set; }
        public Adress ArrivalLocation { get; set; }
        public float Weight { get; private set; }
        public float Price { get; private set; }
        public DescriptionVO Description { get; private set; }
        public Load Load { get; private set; }

        public void UpdateTravel(string travelName, 
            DateTime startDate, 
            DateTime endDate,
            TravelStatus travelStatus,
            Adress departureLocation, 
            Adress arrivalLocation, 
            float weight,
            float price,
            DescriptionVO description,
            Guid loadId,
            Load load)
        {
            TravelName = travelName;
            StartDate = startDate;
            EndDate = endDate;
            DepartureLocation = departureLocation;
            ArrivalLocation = arrivalLocation;
            Weight = weight;
            Price = price;
            Description = description;
            Load = load;
        }

        private static Dictionary<TravelStatus, TravelStatus> _nextStatus = new()
        {
            { TravelStatus.Todo, TravelStatus.InProgress },
            { TravelStatus.InProgress, TravelStatus.Done },
        };

        public void CancelTravel()
        {
            if (TravelStatus == TravelStatus.Done)
            {
                throw new InvalidOperationException("Cannot cancel a done travel.");
            }
            TravelStatus = TravelStatus.Cancelled;
        }

        public void AdvanceStatus()
        {
            if (TravelStatus == TravelStatus.Cancelled)
            {
                throw new InvalidOperationException("Cannot advance a cancelled travel.");
            }

            if (!_nextStatus.TryGetValue(TravelStatus, out var next))
            {
                throw new InvalidOperationException("No next status available.");
            }
            
            TravelStatus = next;
        }
    }
}
