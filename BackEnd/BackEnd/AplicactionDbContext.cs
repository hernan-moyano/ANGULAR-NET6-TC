using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd
{
    public class AplicactionDbContext: DbContext
    {
        //Mapea Modelo con la tabla de la base de datos
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public AplicactionDbContext(DbContextOptions<AplicactionDbContext> options): base(options)
        {

        }
    }
}
