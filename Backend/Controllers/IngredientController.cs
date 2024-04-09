
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Services;
using Backend.Dtos;
using AutoMapper;

namespace Backend.Controllers;
[Route("api/[controller]")]
[ApiController]
public class IngredientController : ControllerBase
{
    private readonly IngredientService _service;
    private readonly IMapper _mapper;

    public IngredientController(IngredientService service, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<IngredientResponse>>> GetIngredients()
    {
        return await _service.GetAllIngreds();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IngredientResponse>> GetIngredient(int id)
    {
        var response = await _service.GetIngredientById(id);
        if (response == null)
            return NotFound();
        return response;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutIngredient(int id, IngredientRequest dto)
    {
        try
        {
            await _service.UpdateIngredient(id, dto);
            return Ok();
        }
        catch (DbUpdateException e)
        {
            return BadRequest(e.Message);
        }
        catch (ArgumentException e)
        {
            return NotFound(e.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<Ingredient>> PostIngredient(IngredientRequest request)
    {
        try
        {
            var newIngred = await _service.CreateIngredient(request);
            var response = _mapper.Map<IngredientResponse>(newIngred);
            return CreatedAtAction(nameof(GetIngredient), new { id = newIngred.Id }, response);

        }
        catch (ArgumentException)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteIngredient(int id)
    {
        try
        {
            await _service.DeleteIngredientById(id);
            return Ok();
        }
        catch (FileNotFoundException)
        {
            return NotFound();
        }
        catch (ArgumentException)
        {
            return NoContent();
        }
    }
}

