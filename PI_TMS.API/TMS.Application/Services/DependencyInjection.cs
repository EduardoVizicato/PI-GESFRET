using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using TMS.Application.Common.Implementation.Authentication;
using TMS.Application.Common.Interface.Authentication;
using TMS.Application.Services.Implementation;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Repositories;
using TMS.Infrastructure.Repositories;
using TMS.Service.Common.Application.Authentication;

namespace TMS.Service.Services
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IVehicleService, VehicleService>();
            services.AddScoped<ILoadService, LoadService>();
            services.AddScoped<ITravelService, TravelService>();
            services.AddScoped<IPasswordHasherService, PasswordHasherService>();
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddScoped<ILoginService, LoginService>();
            return services;
        }
    }
}
