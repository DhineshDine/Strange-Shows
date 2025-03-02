namespace CinemaBookingAPI.Data;

using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options) { }

    // Define your tables here
    public DbSet<User> Users { get; set; } 
}

// 🔹 Fix Class Name: "User" instead of "AppUser"
public class User // Sample User Model
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? PasswordHash { get; set; }
}
