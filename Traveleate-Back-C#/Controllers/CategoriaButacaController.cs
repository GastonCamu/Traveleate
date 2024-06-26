﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Traveleate_Back_C_.Data;
using Traveleate_Back_C_.Models.Dto;

namespace Traveleate_Back_C_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaButacaController : ControllerBase
    {

        private readonly AppDbContext _context;
        private ResponseDto _response;

        public CategoriaButacaController(AppDbContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpGet("{id}")]
        public ResponseDto ObtenerCategoriaButaca(int id)
        {
            try
            {
                var categoriaButaca = _context.CategoriaButacas.FirstOrDefault(c => c.IdCategoriaButaca == id);
                _response.Data = categoriaButaca;
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
