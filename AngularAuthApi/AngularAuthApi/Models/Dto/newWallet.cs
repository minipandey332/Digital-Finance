using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;

namespace AngularAuthApi.Models.Dto
{
    public class newWallet
    {
        public string Email { get; set; }

        public long CardNumber { get; set; }

        public string AccountHolderName { get; set; }

        [Range(100, 999)]
        public int CVV { get; set; }

        public int WalletBalance { get; set; }

        public string UserComments { get; set; }



    }
}
