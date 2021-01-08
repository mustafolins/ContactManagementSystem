using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactManagementAPI.Models
{
    public class ContactManagementContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Group> Groups { get; set; }

        public ContactManagementContext(DbContextOptions<ContactManagementContext> options) : base(options)
        {
        }
    }
}
