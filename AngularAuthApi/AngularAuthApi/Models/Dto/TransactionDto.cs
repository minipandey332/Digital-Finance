using System.ComponentModel.DataAnnotations;

public class TransactionDto
{
    [MaxLength(10)]
    public string SenderMobile { get; set; }

    [MaxLength(10)]
    public string RecipientMobile { get; set; }

    
    public int Amount { get; set; }


}
