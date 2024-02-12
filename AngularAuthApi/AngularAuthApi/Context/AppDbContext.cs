using AngularAuthApi.Models;
using Entity;
using Microsoft.EntityFrameworkCore;


namespace AngularAuthApi.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)

        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserWallet> Userwallettb { get; set; }

        public DbSet<TransactionHistory> transactions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<UserWallet>().ToTable("Userwallettb");
            modelBuilder.Entity<TransactionHistory>().ToTable("transactions");

        }

        internal object GetFlightByEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}
