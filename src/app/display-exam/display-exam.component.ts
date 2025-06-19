import { Component } from '@angular/core';
import { ExamServiceService } from '../Services/exam-service.service';
import { CorrectAnswer, Questions } from '../Model/Filterdata.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-display-exam',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './display-exam.component.html',
  styleUrl: './display-exam.component.css'
})
export class DisplayExamComponent {

  constructor(private service:ExamServiceService){}

  answers: { qid: number; answer: string }[] = [];
  questions:Questions[]=[]

  Total:number|undefined;
  Score:number |undefined;
  showScore:boolean =false;
  isExamFinished:boolean=false;
  correctAnswer!:CorrectAnswer[]

  ngOnInit(){
    //console.log(this.service.examQuestions)
    this.questions=this.service.examQuestions;
    this.answers = this.questions.map(q => ({ qid: q.id, answer: '' }));
  }

  onSubmit(){
    //console.log(this.answers)
    this.service.onSubmitExam(this.answers).subscribe((result)=>{
      this.Score=result.score;
      this.Total=this.answers.length
       this.showScore=true;
       //console.log(this.showScore+" Your score:"+score+"/"+this.answers.length);
      this.isExamFinished = true; 
      this.correctAnswer=result.correctAnswers
     
    });
   
    console.log(this.questions);
     console.log(this.correctAnswer);
  }

isCorrect(qid: number): boolean {
  const correct = this.correctAnswer.find(ans => ans.qid === qid);
  if(correct?.correct) return true;
  return false;
  
}

getCorrectAnswer(qid: number): string {
  const correct = this.correctAnswer.find(ans => ans.qid === qid);
  return correct ? correct.correctOption : 'N/A';
}



}
