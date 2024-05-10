using Microsoft.EntityFrameworkCore;
using Traveleate_Back_C_.Models;

namespace Traveleate_Back_C_.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Butaca> Butacas { get; set; }
        public DbSet<CategoriaButaca> CategoriaButacas { get; set; }
        public DbSet<Colectivo> Colectivos { get; set; }
        public DbSet<Localidad> Localidades { get; set; }
        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Viaje> Viajes { get; set; }

    }
}
