import { Component, OnInit } from "@angular/core";
import { DataService } from "../shared/dataService";
import { Question } from "../shared/question";
import { Answer } from "../shared/answer";


@Component({
  selector: "app-survey",
  templateUrl: "./survey.component.html",
  styleUrls: ["./survey.component.css"]
})
export class SurveyComponent implements OnInit {
  public question: Question;
  private questionId = 0;
  private selectedchoice:number;
  private nickId:number = 0;
  private n_name:string = "";
  private NextBtn = "Next";
  private answer:Answer;
  private msg:string;

  constructor(private data: DataService) {
    this.question = data.question;
  }

  ngOnInit() {
    if (this.questionId < 1) {
      this.question = new Question;
      this.question.id = 0;
      this.question.question = "Hello There! To start the survey, enter your nickname?";
      this.question.choices = [];
      this.questionId++;
    }
  }

  private loadQuestion() {
    if (this.checkAnswer()) {
      this.getNextQuestion();
    }
  };

  onKey(event) {this.n_name = event.target.value;}

  private checkAnswer() {
    if (this.n_name != "") {
      this.getNickname(this.n_name);
      if (this.nickId > 0) {
        this.msg = "This nickname has already been used. Please select another.";
        return false;
      } else {
        if (this.data.addNickName(this.n_name)) {
          this.nickId = this.data.nick.nickId;
        }
      }
      return true;
    }
    if (this.selectedchoice > 0) {
      //TODO: add to answers
      this.answer.questionId = this.question.id;
      this.answer.choiceId = this.selectedchoice;
      this.answer.nickId = this.nickId;
      this.data.addAnswer(this.answer);
    }
  }

  private getNickname(n:string) {
    this.data.getNickname(n)
      .subscribe(success => {
          if (success) {
            this.nickId = this.data.nick.nickId;
            }
        },
        error => {
          console.error(error);
        }
      );
  }

  private getNextQuestion() {
    this.data.getQuestion(this.questionId)
      .subscribe(success => {
          if (success) {
            this.question = this.data.question;
            this.questionId++;
            if (this.questionId > 7) {
              this.NextBtn = "Finish";
            }
          }
        },
        error => {
          console.error(error);
        }
      );
  }
}
