using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Traveleate_Back_C_.Models
{
    public class Viaje
    {
        [Key]
        public int IdViaje { get; set; }

        [ForeignKey("Localidad")]
        public int IdLocalidadOrigen {  get; set; }

        [ForeignKey("Localidad")]
        public int IdLocalidadDestino { get; set; }
        public DateTime Fecha { get; set; }

        [ForeignKey("Colectivo")]
        public int IdColectivo { get; set; }

        public int[] ButacasReservadas { get; set; }

        public int Precio { get; set; }
    }
}
