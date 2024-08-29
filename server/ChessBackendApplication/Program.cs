using ChessBackendApplication.Dao;
using Npgsql;

namespace ChessBackendApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var connection = builder.Configuration.GetConnectionString("PostgresDB");
            builder.Services.AddScoped(provider => new NpgsqlConnection(connection));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAny", builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
                options.AddPolicy("FrontEndClient", builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()
                .WithOrigins("http://localhost:3000"));
            });

            builder.Services.AddScoped<ChessDao, ChessDaoImpl>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("FrontEndClient");
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
