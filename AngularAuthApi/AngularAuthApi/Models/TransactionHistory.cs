using System.ComponentModel.DataAnnotations;

namespace AngularAuthApi.Models
{
    public class TransactionHistory
    {
        // Primary Key
        public int Id { get; set; }

        public Guid TransactionId { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public int Deposit { get; set; }

        public int Withdraw { get; set; }

        public string Comment { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; }


    }
}
