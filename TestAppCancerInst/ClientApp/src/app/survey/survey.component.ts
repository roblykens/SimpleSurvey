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
  public question: Question = new Question;
  private questionId = 0;
  private selectedchoice: number;
  private nickId: number = 0;
  private n_name: string = "";
  private NextBtn = "Next";
  private answer: Answer = new Answer;
  private msg: string;

  constructor(private data: DataService) {
    this.question = data.question;
  }

  onKey(event) { this.n_name = event.target.value; }

  ngOnInit() {
    if (this.questionId < 1) {
      //this.question = new Question;
      this.question.id = 0;
      this.question.question = "Hello There! To start the survey, enter your nickname?";
      this.question.choices = [];
      this.questionId++;
    }
  }

  async loadQuestion() {

    if (this.NextBtn === "")
      return;

    this.msg = "";

    console.log("starting");
    //if no name - alert the user
    if (this.n_name.length === 0) {
      this.msg = "No Nickname was entered. :(";
      return;
    }

    //check the nickname
    console.log("nickid=" + this.nickId);
    if (this.nickId === 0) {
      let p = await this.checkNickId();
      if (p) {
        console.log("nick true");
        return;
      }

      p = await this.addNickName();
      if (p === false) {
        //if we didn't get a nick ID something went wrong
        console.log("add nick false");
        return;
      };
    };

    //check the answer
    let a = await this.checkAnswer();
    if (a) {
      console.log("checked answer");
      //close app if it's the last question
      if (this.NextBtn === 'Finish') {
        this.question.id = 0;
        this.question.question = "Thanks for taking my cool survey. You can close the browser now. ;)";
        this.question.choices = [];
        this.NextBtn = "";
      } else {
        //get the next answer
        this.getNextQuestion();
      }
    };
  };

  private async checkNickId() {
    var val = false;
    //check for an existing name
    await this.data.getNickname(this.n_name).toPromise().then((data: Boolean) => {
        if (data) {
          this.msg = "Nickname has already been used. Please use a different Nickname.";
          val = true;
        }
      });
    return val;
  }

  private async addNickName() {
    var val = false;
    await this.data.addNickName(this.n_name)
      .toPromise().then((success) => {
        if (success) {
          this.nickId = this.data.nick.id;
          val = true;
        }
      },
        err => {
          this.msg = "Failed to save your name. :(";
        }
      );
    return val;
  }

  private async checkAnswer() {
    var val = true;
    //send the selected answer
    if (this.questionId > 1) {
      if (this.selectedchoice > 0) {
        
        this.answer.questionId = this.question.id;
        this.answer.choiceId = this.selectedchoice;
        this.answer.nickNameId = this.nickId;

        await this.data.addAnswer(this.answer)
          .toPromise().then((success) => {
            if (success === false) {
              this.msg = "The answer was not saved.";
              val = false;
            }
          });
      }
    }
    return val;
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
