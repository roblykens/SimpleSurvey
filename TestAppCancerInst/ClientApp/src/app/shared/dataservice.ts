import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { map } from "rxjs/operators";
import { Question, Choices } from "./question";
import { Answer } from "./answer";
import { Nickname } from "./nickname";


@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  //Questions
  public question: Question = new Question();
  public nick: Nickname;

  public getQuestion(val): Observable<boolean> {

    return this.http.get("api/question/" + val)
      .pipe(
        map((data: any) => {
          this.question = data;
          return true;
        }));
  };

  //Nickname
  public getNickname(val): Observable<boolean> {

    return this.http.get("api/nick/" + val)
      .pipe(
        map((data: any) => {
          this.nick = data;
          return true;
        }));
  };

  addNickName(nickname: string) {
    this.nick.nickname = nickname;
    return this.http.post("/api/nick", this.nick)
      .subscribe((val:Nickname) => {
        console.log("POST call successful", val);
        this.nick = val;
      },
        response => {
          console.log("POST call had an error.", response);
        },
        () => { console.log("Success"); }
      );
  }

  //Answers
  addAnswer(answer: Answer) {
    return this.http.post("/api/Answer", answer)
      .subscribe((val:Answer) => {
        console.log("POST call successful", val);
      },
        response => {
          console.log("POST call had an error.", response);
        },
        () => { console.log("Success"); }
      );
  }

};
