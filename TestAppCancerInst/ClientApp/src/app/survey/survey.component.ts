import { Component, OnInit } from "@angular/core";
import { DataService } from "../shared/dataService";
import { Question } from "../shared/question";


@Component({
  selector: "app-survey",
  templateUrl: "./survey.component.html",
  styleUrls: ["./survey.component.css"]
})
export class SurveyComponent implements OnInit {
  public question: Question;
  private questionId = 0;

  constructor(private data: DataService) {
    this.question = data.question;
  }

  loadQuestion() {
    this.data.getQuestion(this.questionId)
      .subscribe(success => {
        if (success) {
          this.question = this.data.question;
          this.questionId++;
        }
      },
        error => {
            console.error(error);
          }
        );
  };


  ngOnInit() {
    if (this.questionId < 1) {
      this.question = new Question;
      this.question.id = 0;
      this.question.question = "Hello There! What's your name?";
      this.question.choices = [];
      this.questionId++;
    }
  }
}
