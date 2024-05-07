using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Traveleate_Back_C_.Models
{
    public class Butaca
    {
        [Key]
        public int IdButaca { get; set; }

        [ForeignKey("CategoriaButaca")]
        public int IdCategoriaButaca { get; set; }
        public bool reservada { get; set; } = false;
    }
}
