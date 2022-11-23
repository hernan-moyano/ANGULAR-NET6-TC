using Azure.Messaging;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        private readonly AplicactionDbContext _context;
        public TarjetaController(AplicactionDbContext context)
        {
            _context = context;
        }


        // GET: api/<TarjetaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //return new string[] { "value1", "value2" };
            try
            {
                var listTarjetas = await _context.TarjetaCredito.ToListAsync();
                return Ok(listTarjetas);
            }
            catch (Exception ex)
            {
                //error 400 con el mensaje de error
                return BadRequest(ex.Message);
            }
        }

        // GET api/<TarjetaController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var tarjeta = await _context.TarjetaCredito.FindAsync(id);

                if (tarjeta == null)
                {
                    //devuelve error 404
                    return NotFound();
                }
                return Ok(tarjeta);
            }
            catch (Exception ex)
            {
                //error 400 con el mensaje de error
                return BadRequest(ex.Message);
            }
        }

        // POST api/<TarjetaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                _context.Add(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(tarjeta);
            }
            catch (Exception ex)
            {
                //error 400 con el mensaje de error
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<TarjetaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                if (id != tarjeta.Id)
                {
                    //devuelve error 404
                    return NotFound();
                }
                _context.Update(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(new {message ="La tarjeta fue actualizada exitosamente"});
            }
            catch (Exception ex)
            {
                //error 400 con el mensaje de error
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var tarjeta = await _context.TarjetaCredito.FindAsync(id);

                if (tarjeta == null)
                {
                    //devuelve error 404
                    return NotFound();
                }
                _context.Remove(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(new { message = $"La tarjeta {tarjeta.NumeroTarjeta} fue eliminada exitosamente" });
            }
            catch (Exception ex)
            {
                //error 400 con el mensaje de error
                return BadRequest(ex.Message);
            }
        }
    
    }
}
