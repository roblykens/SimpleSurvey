using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestAppCancerInst.Data.Entitites;

namespace TestAppCancerInst.Data
{
    public class DbRepository : IDbRepository
    {

        private readonly SurveyDbContext _ctx;
        private readonly ILogger<DbRepository> _logger;
        public DbRepository(SurveyDbContext context, ILogger<DbRepository>  logger)
        {
            _ctx = context;
            _logger = logger;
        }

        public bool GetNickname(string nick)
        {
            var nk = _ctx.Nicknames.FirstOrDefault(n => n.Name == nick);
            if (nk == null)
            {
                return false;
            }

            return true;
        }

        //Get Questions
        public SurveyQuestion GetQuestion(int id = 0)
        {
            return _ctx.Questions
                .Where(q => q.Id == id)
                .Include(c => c.Choices)
                .FirstOrDefault(); 
        }

        //Save Answers
        public SurveryAnswer GetAnswer(int NicknameId, int QuestionId)
        {
            return _ctx.Answers
                .FirstOrDefault(a => a.NickNameId == NicknameId && a.QuestionId == QuestionId);
        }


        public void AddEntity(object model)
        {
            _ctx.Add(model);
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

    }
}
