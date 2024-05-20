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

        [HttpGet("{idViaje}")]
        public ResponseDto ObtenerViaje(int idViaje)
        {
            try
            {
                var viaje = _context.Viajes.FirstOrDefault(b => b.IdViaje == idViaje);

                var localidadOrigen = _context.Localidades.FirstOrDefault(l => l.IdLocalidad == viaje.IdLocalidadOrigen)?.NombreLocalidad;
                var localidadDestino = _context.Localidades.FirstOrDefault(l => l.IdLocalidad == viaje.IdLocalidadDestino)?.NombreLocalidad;

                var viajeConNombres = new
                {
                    IdViaje = viaje.IdViaje,
                    LocalidadOrigen = localidadOrigen,
                    LocalidadDestino = localidadDestino,
                    Fecha = viaje.Fecha,
                    IdColectivo = viaje.IdColectivo,
                    PrecioViaje = viaje.Precio,
                    ButacasReservadas = viaje.ButacasReservadas
                };

                _response.Data = viajeConNombres;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }

            return _response;
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
                    v.Fecha.Date == fecha.Date &&
                    v.ButacasReservadas.Length < 30
                )
                .OrderBy(v => v.Fecha)
                .Select(v => new
                {
                    IdViaje = v.IdViaje,
                    LocalidadOrigen = localidadOrigen,
                    LocalidadDestino = localidadDestino,
                    Fecha = v.Fecha,
                    IdColectivo = v.IdColectivo,
                    PrecioViaje = v.Precio,
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

        [HttpGet("{idViaje}/ButacasReservadas")]
        public ActionResult<ResponseDto> ObtenerButacasReservadas(int idViaje)
        {
            try
            {
                var viaje = _context.Viajes.FirstOrDefault(v => v.IdViaje == idViaje);
                var butacasReservadas = viaje.ButacasReservadas;

                _response.Data = butacasReservadas;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPost("{idViaje}/AgregarButaca")]
        public ActionResult<ResponseDto> AgregarButacaReservada(int idViaje, int numeroButaca)
        {
            try
            {
                if (numeroButaca <= 0)
                {
                    _response.IsSuccess = false;
                    _response.Message = "El numero ingresado tiene que ser mayor a 0";

                }
                else
                {
                    var viaje = _context.Viajes.FirstOrDefault(v => v.IdViaje == idViaje);
                    var butacas = viaje.ButacasReservadas != null ? viaje.ButacasReservadas.ToList() : new List<int>();
                    butacas.Add(numeroButaca);
                    viaje.ButacasReservadas = butacas.ToArray();
                    _context.SaveChanges();
                }
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
