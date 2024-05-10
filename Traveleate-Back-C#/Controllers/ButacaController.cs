using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Traveleate_Back_C_.Data;
using Traveleate_Back_C_.Models;
using Traveleate_Back_C_.Models.Dto;

namespace Traveleate_Back_C_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ButacaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private ResponseDto _response;

        public ButacaController(AppDbContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpGet]
        public ResponseDto ListarButacas()
        {
            try
            {
                IEnumerable<Butaca> butacas = _context.Butacas.ToList();
                _response.Data = butacas;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }

            return _response;
        }

        [HttpGet("{idButaca}")]
        public ResponseDto ObtenerButaca(int idButaca)
        {
            try
            {
                var butaca = _context.Butacas.FirstOrDefault(b => b.IdButaca == idButaca);
                _response.Data = butaca;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }

            return _response;
        }

        [HttpPost]
        public ResponseDto CrearButaca([FromBody] Butaca butaca)
        {
            try
            {
                _context.Butacas.Add(butaca);
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }

            return _response;
        }

    }
}
