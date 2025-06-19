export interface filterData{
    category:string[];
    difficulty:string[];
    no:string;
}

export interface Questions {
  id: number;
  qtitle: string;
  option1: string;
  option2:string;
  option3: string;
  option4:string;
}

export interface Answers{
  qid:number;
  qanswer:string;
}

export interface CorrectAnswer{
  qid:number;
  correctOption:string;
  correct:boolean
}