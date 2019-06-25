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
  public nick: Nickname = new Nickname();

  public getQuestion(val): Observable<boolean> {

    return this.http.get("api/survey/question/" + val)
      .pipe(
        map((data: any) => {
          this.question = data;
          return true;
        }));
  };

  //Nickname
  public getNickname(val): Observable<boolean> {

    return this.http.get("api/survey/nick/" + val)
      .pipe(
        map((data: boolean) => {
            return data;
      }));
  };


  public addNickName(nVal): Observable<boolean> {
    var n = new Nickname();
    n.name = nVal;
    return this.http.post("/api/survey/nick", n)
      .pipe(
        map((data: Nickname) => {
          this.nick = data;
          return true;
        }));
  };


  public addAnswer(answer: Answer): Observable<boolean> {
    return this.http.post("/api/survey/answer/post", answer)
      .pipe(
        map((data: Answer) => {
            if (data) {
              return true;
            }
          },
          err => {
            console.log("Error in saving answer: ", err);
            return false;
          }
        ));
  };

  ////Answers
  //addAnswer(answer: Answer) {
  //  return this.http.post("/api/survey/Answer", answer)
  //    .subscribe((val:Answer) => {
  //      console.log("POST call successful", val);
  //    },
  //      response => {
  //        console.log("POST call had an error.", response);
  //      },
  //      () => { console.log("Success"); }
  //    );
  //}

};
