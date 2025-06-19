import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { QuestionServiceService } from '../Services/question-service.service';
import { QuestionType } from '../Model/questiondata.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [RouterLink,RouterModule,RouterOutlet,NgFor],
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.css'
})
export class QuestionBankComponent {

  constructor(private qservice:QuestionServiceService){

  } 

  AllQuestions!:QuestionType[]

 GetAllQuestions() {
  this.qservice.getAllQuestions().subscribe({
    next: (data) => {
      this.AllQuestions = data;
      console.log('✅ Questions:', this.AllQuestions);
    },
    error: (err) => {
      console.error('❌ Error fetching questions:', err);
    }
  });
}

}
