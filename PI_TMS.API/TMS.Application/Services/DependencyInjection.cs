using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using TMS.Application.Services.Implementation;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Repositories;

namespace TMS.Service.Services
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IDriverService, DriverService>();
            services.AddScoped<IVehicleService, VehicleService>();
            services.AddScoped<ILoadService, LoadService>();
            services.AddScoped<ITravelService, TravelService>();
            return services;
        }
    }
}
