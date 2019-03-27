using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestAppCancerInst.ViewModel
{
    public class AnswersViewModel
    {
        [Required]
        public int NickNameId { get; set; }
        [Required]
        public int QuestionId { get; set; }
        [Required]
        public int ChoiceId { get; set; }
    }


}
