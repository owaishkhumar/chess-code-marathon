using System.Numerics;
using ChessBackendApplication.Models;
using ChessBackendApplication.ViewModels;

namespace ChessBackendApplication.Dao
{
    public interface ChessDao
    {
        Task<int> InsertPlayer(Matches m);
        Task<List<Player>> GetAllPlayers(string country, string sortedField);
        Task<List<PlayerPerformance>> GetPlayerPerformance();
        Task<List<PlayerAboveAverage>> GetPlayerAboveAvg();
    }
}
