using System.Data;
using ChessBackendApplication.Models;
using ChessBackendApplication.ViewModels;
using Npgsql;

namespace ChessBackendApplication.Dao
{
    public class ChessDaoImpl : ChessDao
    {
        NpgsqlConnection _connection;
        public ChessDaoImpl(NpgsqlConnection connection)
        {
            _connection = connection;
        }


        public async Task<int> InsertPlayer(Matches m)
        {
            int rowInserted = 0;
            string message;
            string insertQuery = $"INSERT INTO chess.matches (player1_id, player2_id, match_date, match_level, winner_id) VALUES ({m.Player1Id}, {m.Player2Id}, '{m.MatchDate}', '{m.MatchLevel}', {m.WinnerId});";

            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand insertCommand = new NpgsqlCommand(insertQuery, _connection);
                    insertCommand.CommandType = CommandType.Text;
                    rowInserted = await insertCommand.ExecuteNonQueryAsync();
                }
            }
            catch (NpgsqlException e)
            {
                message = e.Message;
                Console.WriteLine("---------Exception Insert Player--------------" + message);
            }

            Console.WriteLine(rowInserted.ToString());
            return rowInserted;
        }
        public async Task<List<Player>> GetAllPlayers(string country, string sortedField)
        {
            string query = $"select * from chess.players where country ilike '{country}' order by {sortedField};";
            List<Player> playerList = new List<Player>();
            Player? player = null;
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            player = new Player();
                            player.FirstName = reader["first_name"].ToString();
                            player.LastName = reader["last_name"].ToString();
                            player.Country = reader["country"].ToString();
                            player.CurrentWorldRanking = Convert.ToInt32(reader["current_world_ranking"]);
                            player.TotalMatchesPlayed = Convert.ToInt32(reader["total_matches_played"]);
                            playerList.Add(player);
                        }
                    }
                    reader.Close();
                    return playerList;
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("-------------Exception Get Player---------------" + e.Message);
            }
            return playerList;
        }

        public async Task<List<PlayerPerformance>> GetPlayerPerformance()
        {
            string query = "select concat(pw.first_name, ' ', pw.last_name) as full_name,  pw.total_wins,    (pw.total_wins * 100.0 / t.total_matches) as win_percentage from ( select p.player_id, p.first_name, p.last_name, coalesce(mw.wins, 0) as total_wins from chess.players p left join ( select winner_id, count(*) as wins from chess.matches group by winner_id ) mw on p.player_id = mw.winner_id) pw join ( select avg(total_wins) as avg_wins from ( select coalesce(mw.wins, 0) as total_wins from chess.players p  left join ( select winner_id, count(*) as wins from chess.matches group by winner_id ) mw on p.player_id = mw.winner_id ) sub ) avg on pw.total_wins > avg.avg_wins join ( select count(*) as total_matches from chess.matches) t on true order by win_percentage desc;";
            List <PlayerPerformance> playersPerformnceList = new List<PlayerPerformance>();
            PlayerPerformance playerPerformance = null;
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            playerPerformance = new PlayerPerformance();
                            playerPerformance.FullName = reader["full_name"].ToString();
                            playerPerformance.TotalWins = Convert.ToInt32(reader["total_wins"]);
                            playerPerformance.WinPercentage = Convert.ToDecimal(reader["win_percentage"]);
                            playersPerformnceList.Add(playerPerformance);
                        }
                    }
                    reader.Close();
                    return playersPerformnceList;
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("-------------Exception Get Player Performance---------------" + e.Message);
            }
            return playersPerformnceList;
        }

        public async Task<List<PlayerAboveAverage>> GetPlayerAboveAvg()
        {
            string query = "select p.first_name || ' ' || p.last_name as full_name, coalesce(total_matches_played.total_matches, 0) as total_matches_played, coalesce(matches_won.total_wins, 0) as total_matches_won, case when coalesce(total_matches_played.total_matches, 0) = 0 then 0 else round((coalesce(matches_won.total_wins, 0) * 100.0 / coalesce(total_matches_played.total_matches, 0)), 2) end as win_percentage from chess.players p left join (select player_id, count(*) as total_matches from (select player1_id as player_id from chess.matches union all select player2_id as player_id from chess.matches) sub group by player_id) total_matches_played on p.player_id = total_matches_played.player_id left join (select winner_id as player_id, count(*) as total_wins from chess.matches group by winner_id) matches_won on p.player_id = matches_won.player_id;";
            List<PlayerAboveAverage> playersAboveAverageList = new List<PlayerAboveAverage>();
            PlayerAboveAverage playerAboveAverage = null;
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            playerAboveAverage = new PlayerAboveAverage();
                            playerAboveAverage.FullName = reader["full_name"].ToString();
                            playerAboveAverage.TotalMatchesPlayed = Convert.ToInt32(reader["total_matches_played"]);
                            playerAboveAverage.TotalMatchesWon = Convert.ToInt32(reader["total_matches_won"]);
                            playerAboveAverage.WinPercentage = Convert.ToDecimal(reader["win_percentage"]);
                            playersAboveAverageList.Add(playerAboveAverage);
                        }
                        reader.Close();
                        return playersAboveAverageList;
                    }
                }
            }
            catch (NpgsqlException e)
            {
                Console.WriteLine("---------------------Exception Get Player Above Avg----------------------"+e.Message);
            }
            return playersAboveAverageList;
        }
    }
}
