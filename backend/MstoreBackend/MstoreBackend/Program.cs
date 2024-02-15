using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(options =>
    {
        builder.Configuration.Bind("AzureAd", options);

        options.TokenValidationParameters = new TokenValidationParameters
        {
            // Specify the valid audiences
            ValidAudiences = new[] { "api://ec75aacf-dd23-4f9c-a1fd-c9403209ba1a" }
        };

        options.Events = new JwtBearerEvents();
    }, options => { builder.Configuration.Bind("AzureAd", options); });


builder.Services.AddAuthorization();

builder.Services.AddControllersWithViews();
builder.Services.AddCors(options => options.AddPolicy("AllowAllOrigins", p => { p.WithOrigins("https://localhost:5173", "http://localhost:5173", "https://10.14.21.215:8801", "https://imexstg.petronas.com", "https://imex.petronas.com").AllowAnyMethod().AllowAnyHeader(); }));


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
