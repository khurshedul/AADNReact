using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MstoreBackend.Models;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MstoreBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : ControllerBase
    {
        //private readonly ModelServices _modelServices;

        public TokenController(/*ModelServices modelServices*/)
        {
            //_modelServices = modelServices;
        }
        [AllowAnonymous]
        [HttpPost("/login")]
        public IActionResult GetToken([FromBody] TokenRequestModel request)
        {
            // Validate App Key and App Secret in your database
            bool isValidCredentials = ValidateCredentialsInDatabase(request.Username, request.Password);

            if (isValidCredentials)
            {
                // Issue a JWT
                var token = GenerateJwtToken(request.Username, request.Password);
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }

        private bool ValidateCredentialsInDatabase(string appKey, string appSecret)
        {
            // Implement your logic to validate credentials against your database
            // Return true if the credentials are valid, otherwise return false
            // This might involve looking up the app in your database and comparing the secret
            //return _modelServices.ValidateApiKey(appKey, appSecret);
            return true;

        }

        private string GenerateJwtToken(string appKey, string appSecret)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var MyConfig = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            string secret = MyConfig.GetValue<string>("ApiSettings:Secret");
            string issuer = MyConfig.GetValue<string>("ApiSettings:Issuer");
            string audience = MyConfig.GetValue<string>("ApiSettings:Audience");
            var key = Encoding.ASCII.GetBytes(secret);

            var claimList = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email,""),
                new Claim(JwtRegisteredClaimNames.Sub,appKey),
                new Claim(JwtRegisteredClaimNames.GivenName,appKey)
            };


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = audience,
                Issuer = issuer,
                Subject = new ClaimsIdentity(claimList),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }


    }
}
