using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TestAppCancerInst.Data.Entitites;

namespace TestAppCancerInst.Data
{
    public class SurveyDbContext : DbContext
    {
        public SurveyDbContext(DbContextOptions<SurveyDbContext> options) 
            : base(options)
        {
        }

        public DbSet<SurveyNickname> Nicknames { set; get; }
        public DbSet<SurveyQuestion> Questions { set; get; }
        public DbSet<SurveyChoice> Choices { set; get; }
        public DbSet<SurveryAnswer> Answers { set; get; }

    }
}
