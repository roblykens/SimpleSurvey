using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Pages.Internal.Account;
using Microsoft.AspNetCore.Identity.UI.Pages.Internal.Account.Manage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestAppCancerInst.Data;
using TestAppCancerInst.Data.Entitites;
using TestAppCancerInst.ViewModel;

namespace TestAppCancerInst.Controllers
{
    
    public class SurveyController : Controller
    {
        public IDbRepository _repo;
        private readonly ILogger<SurveyController> _log;
        private readonly IMapper _map;

        public SurveyController(IDbRepository repo, ILogger<SurveyController> log, IMapper map)
        {
            _repo = repo;
            _log = log;
            _map = map;
        }

        [Route("api/question/{id?}")]
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                return Ok(_repo.GetQuestion(id));
            }
            catch (Exception ex)
            {
                _log.LogError($"Failed to get Question: {ex}");
                return BadRequest("Failed to get Question");
            }
        }

        [Route("api/answer/[action]/{nid,qid}")]        
        [HttpGet("{nid:int},{qid:int}")]
        public IActionResult Get(int nicknameId, int questionId)
        {
            try
            {
                var answer = _repo.GetAnswer(nicknameId, questionId);
                if (answer != null)
                {
                    return Ok(answer);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _log.LogError($"Failed to get Answer: {ex}");
                return BadRequest("Failed to get Answer");
            }
        }


        
        [Route("api/answer/[action]/{model}")]
        [HttpPost]
        public IActionResult Post([FromBody]AnswersViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newAnswer = _map.Map<AnswersViewModel, SurveryAnswer>(model);
                    _repo.AddEntity(newAnswer);
                    if (_repo.SaveAll())
                    {
                        return Created($"/api/survey/{newAnswer.Id}", _map.Map<SurveryAnswer, AnswersViewModel>(newAnswer));
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _log.LogError($"Failed to save a new answer: {ex}");
            }
            return BadRequest("Failed to save new answer");
        }

        [Route("api/nick/{nickname}")]
        [HttpGet("{nickname}")]
        public IActionResult Get(string nickname)
        {
            try
            {
                return Ok(_repo.GetNickname(nickname));
            }
            catch (Exception ex)
            {
                _log.LogError($"Failed to get nickname: {ex}");
                return BadRequest("Failed to get nickname");
            }
        }


        [Route("api/nick/{model}")]
        [HttpPost]
        public IActionResult PostNick([FromBody]NickNameViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newNick = _map.Map<NickNameViewModel, SurveyNickname>(model);
                    _repo.AddEntity(newNick);
                    if (_repo.SaveAll())
                    {
                        return Created($"/api/survey/{newNick.Id}", _map.Map<SurveyNickname, NickNameViewModel>(newNick));
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _log.LogError($"Failed to save a new answer: {ex}");
            }
            return BadRequest("Failed to save new answer");
        }
    }
}
