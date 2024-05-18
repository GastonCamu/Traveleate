using System.ComponentModel.DataAnnotations;

namespace Traveleate_Back_C_.Models
{
    public class CategoriaButaca
    {
        [Key]
        public int IdCategoriaButaca { get; set; }
        public string Categoria { get; set; }
        public int Precio { get; set; }
    }
}
