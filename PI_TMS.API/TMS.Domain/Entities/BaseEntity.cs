using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Domain.Entites
{
    public class BaseEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public bool IsActive { get; set; }
    }
}
