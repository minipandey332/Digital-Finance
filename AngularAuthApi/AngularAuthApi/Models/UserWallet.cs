using System.ComponentModel.DataAnnotations;
using System;
using System.Runtime.InteropServices;

namespace Entity
{
    public class UserWallet
    {
        [Key]
        public Guid WalletId { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(10)]
        public string Mobile { get; set; }

        public long CardNumber { get; set; }

        public string AccountHolderName { get; set; }

        [Range(100, 999)]
        public int CVV { get; set; }

        [DataType(DataType.Date)]
        public DateTime WalletCreationDate { get; set; }

        public int WalletBalance { get; set; }

        public string UserComments { get; set; }

        public DateTime UpdatedAt { get; set; }


    }

}