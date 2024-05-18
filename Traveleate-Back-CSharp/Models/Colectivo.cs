using System.ComponentModel.DataAnnotations;

namespace Traveleate_Back_C_.Models
{
    public class Colectivo
    {
        [Key]
        public int IdColectivo { get; set; }
        public string Matricula { get; set; }
        public int TotalButacas { get; set; }
    }
}
