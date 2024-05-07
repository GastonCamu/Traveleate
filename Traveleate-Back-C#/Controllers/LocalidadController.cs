using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Traveleate_Back_C_.Data;
using Traveleate_Back_C_.Models;
using Traveleate_Back_C_.Models.Dto;

namespace Traveleate_Back_C_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocalidadController : ControllerBase
    {
        private readonly AppDbContext _context;
        private ResponseDto _response;

        public LocalidadController(AppDbContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpGet]
        public ResponseDto ListarLocalidades()
        {
            try
            {
                IEnumerable<Localidad> localidades = _context.Localidades.ToList();
                _response.Data = localidades;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }

            return _response;
        }

        [HttpGet("{NombreLocalidad}")]
        public ResponseDto ObtenerLocalidad(string NombreLocalidad)
        {
            try
            {
                var localidad = _context.Localidades.FirstOrDefault(p => p.NombreLocalidad == NombreLocalidad);
                _response.Data = localidad;
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
