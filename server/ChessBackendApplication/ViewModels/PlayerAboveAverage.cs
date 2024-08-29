namespace ChessBackendApplication.ViewModels
{
    public class PlayerAboveAverage
    {
        public string? FullName { get; set; }   
        public int TotalMatchesPlayed { get; set; }
        public int TotalMatchesWon { get; set; }
        public decimal WinPercentage { get; set; }
    }
}
