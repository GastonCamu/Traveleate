using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Traveleate_Back_C_.Data;
using Traveleate_Back_C_.Models;
using Traveleate_Back_C_.Models.Dto;

namespace Traveleate_Back_C_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViajeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private ResponseDto _response;

        public ViajeController(AppDbContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpGet("{localidadOrigen}/{localidadDestino}/{fecha}")]
        public ActionResult<ResponseDto> ObtenerViajesPorNombre(string localidadOrigen, string localidadDestino, DateTime fecha)
        {
            try
            {
                var localidadOrigenEntity = _context.Localidades.FirstOrDefault(l => l.NombreLocalidad == localidadOrigen);
                var localidadDestinoEntity = _context.Localidades.FirstOrDefault(l => l.NombreLocalidad == localidadDestino);

                var viajes = _context.Viajes
                    .Where (v =>
                    v.IdLocalidadOrigen == localidadOrigenEntity.IdLocalidad &&
                    v.IdLocalidadDestino == localidadDestinoEntity.IdLocalidad &&
                    v.Fecha.Date == fecha.Date
                )
                .Select(v => new
                {
                    IdViaje = v.IdViaje,
                    LocalidadOrigen = localidadOrigen,
                    LocalidadDestino = localidadDestino,
                    Fecha = v.Fecha,
                    IdColectivo = v.IdColectivo
                })
                .ToList();

                _response.Data = viajes;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }

            return _response;
        }

        [HttpPost]
        public ResponseDto CrearViaje([FromBody] Viaje viaje)
        {
            try
            {
                _context.Viajes.Add(viaje);
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
