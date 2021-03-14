using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using SimpleSurvey.Data.Entitites;

namespace SimpleSurvey.Data
{

    public class Seeder
    {

        private readonly SurveyDbContext _ctx;
        private readonly IHostingEnvironment _hosting;

        public Seeder(SurveyDbContext ctx, IHostingEnvironment hosting)
        {
            _ctx = ctx;
            _hosting = hosting;
        }

        public void SeedSurveyDb()
        {
            _ctx.Database.EnsureCreated();

            if (!_ctx.Questions.Any())
            {
                // Need to create question data
                var filepath = Path.Combine(_hosting.ContentRootPath, "Data/Seed/questions.json");
                var json = File.ReadAllText(filepath);
                var questions = JsonConvert.DeserializeObject<IEnumerable<SurveyQuestion>>(json);
                _ctx.Questions.AddRange(questions);

                _ctx.SaveChanges();

                // Need to create choices data
                filepath = Path.Combine(_hosting.ContentRootPath, "Data/Seed/choices.json");
                json = File.ReadAllText(filepath);
                var choices = JsonConvert.DeserializeObject<IEnumerable<SurveyChoice>>(json);
                _ctx.Choices.AddRange(choices);

                _ctx.SaveChanges();
            }
        }
    }
}
