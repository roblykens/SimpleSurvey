import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { map } from "rxjs/operators";
import { Question, Choices } from "./question";
//import { Answer } from "./answer";


@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  //Questions
  public question: Question = new Question();

  public getQuestion(val): Observable<boolean> {

    //this.http.get<Question>("api/question/" + val).subscribe(result => {
    //    this.question = result;
    //    return true;
    //  },
    //  error => {
    //    console.error(error);
    //    return false;
    //  });

    return this.http.get("api/question/" + val)
      .pipe(
        map((data: any) => {
          this.question = data;
          return true;
        }));

  };

  //this.http.get('http://localhost:5000/api/question/' + val)//.pipe(
    //  .subscribe((data: any) => {
    //    map((data: any) => {
    //        let response = Response;
    //        console.log(data);
    //        this.question = data;
    //  },
    //  error => {
    //    console.log('Log the error here: ', error);
    //  });
  //};


  //private handleError<T>(operation = 'operation', result?: T) {
  //  return (error: any): Observable<T> => {

  //    console.error(error); // log to console instead

  //    // Let the app keep running by returning an empty result.
  //    return of(result as T);
  //  };
  //}


  ////Answers
  //addAnswer(answer: Answer) {
  //  return this.http.post("/api/AddEntity", answer)
  //  .subscribe((val) =>
  //  {
  //    console.log("POST call successful", val);
  //  },
  //    response => {
  //      console.log("POST call had an error.", response);
  //    },
  //    () => {console.log("Success");}
  //  );
  //}
};
