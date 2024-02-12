using AngularAuthApi.Models;

namespace AngularAuthApi.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);
    }
}
