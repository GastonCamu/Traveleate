using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Traveleate_Back_C_.Models
{
    public class Reserva
    {
        [Key]
        public int IdReserva { get; set; }
        [Required]
        public string? NombreCliente {  get; set; }
        [Required]
        public string? ApellidoCliente { get; set; }
        [Required]
        public string? DNICliente { get; set; }
        [Required]
        public DateOnly FechaNacimiento { get; set; }
        [ForeignKey("Butaca")]
        public int IdButaca { get; set; }
        [ForeignKey("Viaje")]
        public int IdViaje { get; set; }
        public decimal PrecioTotal { get; set; }

    }
}
