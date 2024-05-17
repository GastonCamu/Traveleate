using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Traveleate_Back_C_.Data;
using Traveleate_Back_C_.Models;
using Traveleate_Back_C_.Models.Dto;

namespace Traveleate_Back_C_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColectivoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private ResponseDto _response;

        public ColectivoController(AppDbContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpGet("{idColectivo}")]
        public ResponseDto ObtenerCantButacas(int idColectivo)
        {
            try
            {
                var colectivo = _context.Colectivos.FirstOrDefault(p => p.IdColectivo == idColectivo);
                if (colectivo != null)
                {
                    _response.Data = colectivo.TotalButacas;
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Es nulo colectivo";
                }
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
