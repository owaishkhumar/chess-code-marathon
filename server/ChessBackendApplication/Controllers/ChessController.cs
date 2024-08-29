using System.Numerics;
using ChessBackendApplication.Dao;
using ChessBackendApplication.Models;
using ChessBackendApplication.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChessBackendApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChessController : ControllerBase
    {
        public readonly ChessDao _chessDao;

        public ChessController(ChessDao chessDao)
        {
            _chessDao = chessDao;
        }

        [HttpPost]
        public async Task<ActionResult<Matches>> PlayerInserted(Matches match)
        {
            if (match != null)
            {
                if (ModelState.IsValid)
                {
                    int res = await _chessDao.InsertPlayer(match);
                    if (res > 0)
                    {
                        return Ok(res);
                    }
                }
                return BadRequest("Failed to add player");

            }
            else
            {
                return BadRequest("Not Found");
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Player>>> GetAllPlayer([FromQuery] string country, [FromQuery] string sortedFlied)
        {
            List<Player> players = await _chessDao.GetAllPlayers(country, sortedFlied);
            if (players != null)
            {
                return Ok(players);
            }
            return NotFound();
        }

        [HttpGet("playerperformance")]
        public async Task<ActionResult<List<PlayerPerformance>>> GetPlayerPerformance()
        {
            List<PlayerPerformance> playerPerformances = await _chessDao.GetPlayerPerformance();
            if (playerPerformances != null)
            {
                return Ok(playerPerformances);
            }
            return NotFound();
        }

        [HttpGet("playeraboveaverge")]
        public async Task<ActionResult<List<PlayerAboveAverage>>> GetPlayerAboveAvg()
        {
            List<PlayerAboveAverage> playerAboveAverage = await _chessDao.GetPlayerAboveAvg();
            if (playerAboveAverage != null)
            {
                return Ok(playerAboveAverage);
            }
            return NotFound();
        }
    }
}
