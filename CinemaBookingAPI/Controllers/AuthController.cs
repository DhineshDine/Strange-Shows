using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private static List<User> users = new(); // Simulated Database
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // **Register Endpoint**
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterModel model)
    {
        if (model == null || string.IsNullOrWhiteSpace(model.Password))
        {
            return BadRequest(new { message = "Invalid data." });
        }

        // **Hash Password before storing**
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

        users.Add(new User
        {
            Name = model.Name,
            Email = model.Email,
            PasswordHash = hashedPassword
        });

        return Ok(new { message = "User registered successfully!" });
    }

    // **Login Endpoint**
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel model)
    {
        var user = users.FirstOrDefault(u => u.Email == model.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        // **Generate JWT Token**
        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }

    // **JWT Token Generation**
    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = Encoding.UTF8.GetBytes(jwtSettings["Key"] ?? throw new InvalidOperationException("JWT Key is missing"));

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}

// **Models**
public class RegisterModel
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginModel
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class User
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
}
