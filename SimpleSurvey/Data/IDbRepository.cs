using TestAppCancerInst.Data.Entitites;

namespace TestAppCancerInst.Data
{
    public interface IDbRepository
    {
        void AddEntity(object model);
        SurveryAnswer GetAnswer(int NicknameId, int QuestionId);
        bool GetNickname(string nick);
        SurveyQuestion GetQuestion(int id = 0);
        bool SaveAll();
    }
}