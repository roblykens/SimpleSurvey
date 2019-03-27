import * as _ from "lodash";

export class Question {
  id: number;
  question: string;
  choices: Array<Choices> = new Array<Choices>();
}

export class Choices {
  id: number;
  questionId: number;
  choice: string;
}
