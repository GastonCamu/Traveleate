using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Traveleate_Back_C_.Data;
using Traveleate_Back_C_.Models;
using Traveleate_Back_C_.Models.Dto;

namespace Traveleate_Back_C_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private ResponseDto _response;

        public ReservaController(AppDbContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpPost]
        public ResponseDto CrearReserva([FromBody] Reserva reserva)
        {
            try
            {
                _context.Reservas.Add(reserva);
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
