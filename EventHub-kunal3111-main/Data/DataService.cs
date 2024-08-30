using System.Data;
using Dapper;
using MySql.Data.MySqlClient;

namespace Data.Services
{
    public class DataService
    {
        private readonly string _connectionString;

        public DataService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<T>> LoadData<T, U>(string sql, U parameters)
        {
            using IDbConnection connection = new MySqlConnection(_connectionString);
            return (await connection.QueryAsync<T>(sql, parameters)).ToList();
        }
         public async Task SaveData<T>(string sql, T parameters)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(sql, parameters);
            }
        }
    }
}
// taken help from task manager lab
