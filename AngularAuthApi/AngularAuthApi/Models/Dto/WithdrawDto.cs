using System.ComponentModel.DataAnnotations;

namespace AngularAuthApi.Models.Dto
{
    public class WithdrawDto
    {


        [MaxLength(10)]
        public string Mobile { get; set; }
        public decimal Amount { get; set; }
        public long CardNumber { get; set; }


    }
}
