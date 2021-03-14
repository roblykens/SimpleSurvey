using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleSurvey.Data.Entitites
{
    public class SurveyQuestion
    {
        public int Id { get; set;  }
        public string Question { get; set; }
        public ICollection<SurveyChoice> Choices { get; set; }
    }
}
