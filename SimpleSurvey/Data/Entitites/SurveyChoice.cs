using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleSurvey.Data.Entitites
{
    public class SurveyChoice
    {
        public int Id { get; set; }
        public SurveyQuestion Question { get; set; }
        public string Choice { get; set; }
    }
}
