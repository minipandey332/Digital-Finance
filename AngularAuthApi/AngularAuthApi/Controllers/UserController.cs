using AngularAuthApi.Context;
using AngularAuthApi.Models;
using AngularAuthYtAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AngularAuthApi.Models.Dto;

// working on it
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

using System.Diagnostics;

using System.IdentityModel.Tokens.Jwt;

using Microsoft.IdentityModel.Tokens;

using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using AngularAuthApi.Models.Dto;
using Entity;
using System.Threading.Tasks;
using System;


namespace AngularAuthApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;

        }




        // Worked Done
        [HttpGet("user/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            try
            {
                var user = await _authContext.Users
                    .Where(u => u.Email == email)
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    return NotFound(new { Message = "User not found for the given email." });
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while processing the request.", Error = ex.Message });
            }
        }

        [HttpGet("wallet/{email}")]
        public async Task<IActionResult> GetWalletByEmail(string email)
        {
            try
            {
                var wallet = await _authContext.Userwallettb.Where(u => u.Email == email).FirstOrDefaultAsync();
                if (wallet == null)
                {
                    return NotFound(new { Message = "User not found for the given email." });
                }
                return Ok(wallet);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while processing the request.", Error = ex.Message });
            }
        }


        [HttpGet("transactionHistoryapi/{email}")]
        public async Task<IActionResult> GetTransactionHistoryByEmail(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("Email is required");
                }

                // Get the transaction history for the provided email
                var transactionHistory = await _authContext.transactions
                    .Where(t => t.Email == email)
                    .ToListAsync();

                if ( transactionHistory.Count == 0)
                {
                    return NotFound("No transaction history found for the provided email");
                }

                return Ok(transactionHistory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while processing the request.", Error = ex.Message });
            }
        }



        // NEW Changes Done

        [HttpPost("CreateWallet")]
        public async Task<IActionResult> CreateWallet([FromBody] UserWallet walletData)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(walletData.Email))
                {
                    return BadRequest(new { Message = "Email is required." });
                }

                // Check if the user with the provided email exists
                var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Email == walletData.Email);
                if (user == null)
                {
                    return BadRequest(new { Message = "User with the provided email does not exist." });
                }



                // Fetch the Mobile from the User table and autofill it in the walletData
                walletData.Mobile = user.Mobile;

                // Check if the user already has a wallet
                var existingWallet = await _authContext.Userwallettb.FirstOrDefaultAsync(w => w.Email == walletData.Email);

                // If the wallet already exists, update its details
                if (existingWallet != null)
                {
                     existingWallet.Mobile = walletData.Mobile;
                    existingWallet.CardNumber = walletData.CardNumber;
                    existingWallet.AccountHolderName = walletData.AccountHolderName;
                    existingWallet.CVV = walletData.CVV;
                    existingWallet.WalletBalance = walletData.WalletBalance;
                    existingWallet.UserComments = walletData.UserComments;
                    existingWallet.UpdatedAt = DateTime.Now;

                    _authContext.Userwallettb.Update(existingWallet);
                }
                else // If the wallet does not exist, create a new wallet for the user
                {
                    walletData.WalletId = Guid.NewGuid();
                    walletData.WalletCreationDate = DateTime.Now;
                    _authContext.Userwallettb.Add(walletData);
                }

                await _authContext.SaveChangesAsync();

                // Return the Mobile field value in the response
                var response = new
                {
                    Message = "Wallet created/updated successfully.",
                    Mobile = walletData.Mobile // Assuming Mobile is a string property in UserWallet
                };


                return Ok(new { Message = "Wallet created/updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while processing the request.", Error = ex.Message });
            }
        }


        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginDto userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Email == userObj.Email);
            if (user == null)
                return NotFound(new { Message = "User not found! Backend" });

            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }

            user.Token = CreateJwt(user);
            var newAccessToken = user.Token;
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(5);
            await _authContext.SaveChangesAsync();

            //return Ok(new
            //{
            //    Token = user.Token,
            //    Message = "Login Success!Backend"
            //}) ; 
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });

        }

        [HttpPost("register")]

        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {

            if (userObj == null)
                return BadRequest();

            var passMessage = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(passMessage))
                return BadRequest(new { Message = passMessage.ToString() });

            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Token = "";

            if (await CheckEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "Email Already Exists! Backend" });

            userObj.Token = "";
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            //return Ok(new
            //{
            //    Message = "User Registered! Backend"
            //});
            return Ok(new
            {
                Status = 200,
                Message = "User Added!"
            });
        }

        [HttpPut("reset-password/{email}")]
        public async Task<IActionResult> ResetPassword(string email, [FromBody] string newPassword)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(newPassword))
                return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
                return NotFound(new { Message = "User not found! Backend" });

            var passMessage = CheckPasswordStrength(newPassword);
            if (!string.IsNullOrEmpty(passMessage))
                return BadRequest(new { Message = passMessage.ToString() });

            user.Password = PasswordHasher.HashPassword(newPassword);
            await _authContext.SaveChangesAsync();

            return Ok(new
            {
                Status = 200,
                Message = "Password reset successful!"
            });
        }



        private Task<bool> CheckEmailExistAsync(string? email)
           => _authContext.Users.AnyAsync(x => x.Email == email);

        //private Task<bool> CheckUsernameExistAsync(string? username)
        //    => _authContext.Users.AnyAsync(x => x.Email == username);

        private static string CheckPasswordStrength(string pass)
        {
            StringBuilder sb = new StringBuilder();
            if (pass.Length < 9)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
                sb.Append("Password should be AlphaNumeric" + Environment.NewLine);
            if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contain special charcter" + Environment.NewLine);
            return sb.ToString();
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                //new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name,$"{user.Email}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _authContext.Users
                .Any(a => a.RefreshToken == refreshToken);
            if (tokenInUser)
            {
                return CreateRefreshToken();
            }
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("This is Invalid Token");
            return principal;

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] TokenApiDto tokenApiDto)
        {
            if (tokenApiDto is null)
                return BadRequest("Invalid Client Request");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipleFromExpiredToken(accessToken);
            var email = principal.Identity.Name;
            var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Invalid Request");
            var newAccessToken = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _authContext.SaveChangesAsync();
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }


        [HttpPut("updates")]
        public async Task<IActionResult> UpdateUser([FromBody] updateprofileDto updatedUser)
        {
            if (updatedUser == null)
            {
                return BadRequest("User not found");
            }

            // Find the user in the database
            var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Email == updatedUser.Email);
            if (user == null)
            {
                return NotFound("Email doesn't exist!");
            }

            // Update the user's details
            user.FullName = updatedUser.FullName;
            user.Email = updatedUser.Email;
            user.Date_Of_Birth = updatedUser.Date_Of_Birth;
            user.Address = updatedUser.Address;
            user.Mobile = updatedUser.Mobile;

            try
            {
                await _authContext.SaveChangesAsync();
                return Ok(new { Message = "User details updated successfully" });
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, new { Message = "An error occurred while updating user details" });
            }
        }


        // NEW Changes Done
        [HttpPost("withdraw")]
        public async Task<IActionResult> WithdrawMoney([FromBody] WithdrawDto withdrawDto)
        {
            try
            {
                if (withdrawDto == null)
                {
                    return BadRequest();
                }

                var userWallet = await _authContext.Userwallettb
                    .FirstOrDefaultAsync(u => u.CardNumber == withdrawDto.CardNumber && u.Mobile == withdrawDto.Mobile);

                if (userWallet == null)
                {
                    return NotFound(new { Message = "Wallet not found" });
                }


                userWallet.WalletBalance -= (int)withdrawDto.Amount; // Explicitly convert decimal to int
                userWallet.UpdatedAt = DateTime.Now;

                // Save the changes to the user wallet
                _authContext.Userwallettb.Update(userWallet);

                // Save the transaction history
                var transaction = new TransactionHistory
                {
                    Email = userWallet.Email, // Autofill the email field with the same value as the UserWallet email
                    Mobile = userWallet.Mobile,
                    Withdraw = (int)withdrawDto.Amount, // Explicitly convert decimal to int
                    Comment = "Withdraw Money",
                    CreationDate = DateTime.Now,
                   TransactionId = Guid.NewGuid()
            };
                _authContext.transactions.Add(transaction);

                await _authContext.SaveChangesAsync();

                return Ok(new
                {
                    Status = 200,
                    Message = "Money Withdraw successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while processing the request.", Error = ex.Message });
            }
        }




        [HttpPost("transfer")]
        public async Task<IActionResult> UserToUserTransaction([FromBody] TransactionDto transactionDto)
        {
            if (transactionDto == null)
                return BadRequest();

            var sender = await _authContext.Userwallettb.FirstOrDefaultAsync(x => x.Mobile == transactionDto.SenderMobile);
            var recipient = await _authContext.Userwallettb.FirstOrDefaultAsync(x => x.Mobile == transactionDto.RecipientMobile);


            if (sender == null || recipient == null)
                return BadRequest("Invalid sender or recipient Mobile Number");

            if (sender.WalletBalance < (int)transactionDto.Amount)
                return BadRequest("Insufficient balance");

            sender.WalletBalance -= (int)transactionDto.Amount;
            sender.UpdatedAt = DateTime.Now;
         

            recipient.WalletBalance += (int)transactionDto.Amount;
            recipient.UpdatedAt = DateTime.Now;
         

            await _authContext.SaveChangesAsync();

            // Create a single entry in TransactionHistory table for the transfer
            var transactionId = Guid.NewGuid();
            var transaction = new TransactionHistory
            {
                TransactionId = transactionId,
                Email = sender.Email,
                Mobile = transactionDto.SenderMobile,
                Deposit = 0,
                Withdraw = (int)transactionDto.Amount,
                Comment = $"Transfer Money to {recipient.AccountHolderName}",
                CreationDate = DateTime.Now
            };

            var recipientTransaction = new TransactionHistory
            {
                TransactionId = transactionId,
                Email = recipient.Email,
                Mobile = transactionDto.RecipientMobile,
                Deposit = (int)transactionDto.Amount,
                Withdraw = 0,
                Comment = $"Get Money from {sender.AccountHolderName}",
                CreationDate = DateTime.Now
            };

            _authContext.transactions.Add(transaction);
            _authContext.transactions.Add(recipientTransaction);

            await _authContext.SaveChangesAsync();

            return Ok(new
            {
                Status = 200,
                Message = "User-to-user transaction completed successfully"
            });
        }

        // NEW Changes Done

        [HttpPost("DepositMoney")]
        public async Task<IActionResult> DepositMoney([FromBody] DepositDto depositDto)
        {
            try
            {
                if (depositDto == null)
                {
                    return BadRequest();
                }

                var userWallet = await _authContext.Userwallettb
                    .FirstOrDefaultAsync(u => u.CardNumber == depositDto.CardNumber && u.Mobile == depositDto.Mobile);

                if (userWallet == null)
                {
                    return NotFound(new { Message = "Wallet not found" });
                }

              
                userWallet.WalletBalance += (int)depositDto.Amount; // Explicitly convert decimal to int
                userWallet.UpdatedAt = DateTime.Now;

                // Save the changes to the user wallet
                _authContext.Userwallettb.Update(userWallet);

                // Save the transaction history
                var transaction = new TransactionHistory
                {
                    Email = userWallet.Email, // Autofill the email field with the same value as the UserWallet email
                    Mobile = userWallet.Mobile,
                    Deposit = (int)depositDto.Amount, // Explicitly convert decimal to int
                    Comment = "Deposit Money",
                     CreationDate = DateTime.Now,
                    TransactionId = Guid.NewGuid()
                };
                _authContext.transactions.Add(transaction);

                await _authContext.SaveChangesAsync();

                return Ok(new
                {
                    Status = 200,
                    Message = "Money deposited successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while processing the request.", Error = ex.Message });
            }
        }



    }
}

