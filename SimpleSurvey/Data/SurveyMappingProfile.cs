using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using TestAppCancerInst.Controllers;
using TestAppCancerInst.Data.Entitites;
using TestAppCancerInst.ViewModel;

namespace TestAppCancerInst.Data
{
    public class SurveyMappingProfile : Profile
    {
        public SurveyMappingProfile()
        {
            CreateMap<SurveyNickname, NickNameViewModel>()
                .ForMember(n => n.Name, ex => ex.MapFrom(n => n.Name))
                .ReverseMap();

            CreateMap<SurveryAnswer, AnswersViewModel>()
                .ReverseMap();
        }
    }
}
