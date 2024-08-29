using System.ComponentModel.DataAnnotations;

namespace ChessBackendApplication.Models
{
    public class Matches
    {
        [Required(ErrorMessage = "Player 1 id is required")]
        public int Player1Id { get; set; }
        [Required(ErrorMessage = "player 2 id is required")]
        public int Player2Id { get; set; }
        public string MatchDate { get; set; }
        public string MatchLevel { get; set; }

        public int WinnerId { get; set; }
    }
}
