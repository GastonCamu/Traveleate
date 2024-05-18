using System.ComponentModel.DataAnnotations;

namespace Traveleate_Back_C_.Models
{
    public class Localidad
    {
        [Key]
        public int IdLocalidad { get; set; }
        public string NombreLocalidad { get; set; }
    }
}
