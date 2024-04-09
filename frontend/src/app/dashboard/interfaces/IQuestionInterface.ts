import {IAnswerInterface} from "./answer.interface";

export interface IQuestionInterface {
  id: number,
  question: string,
  variant1: string,
  variant2: string,
  variant3: string,
  variant4: string,
  variant5: string,
  variant6: string,
  execution_time_id: number | null,
  right_variant: number,
  history_id: number | null,
  come_back_id: number | null,
  answer_id: number | null,
  answers: IAnswerInterface[]

}
