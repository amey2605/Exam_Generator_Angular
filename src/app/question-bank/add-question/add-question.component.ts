import { Component } from '@angular/core';
import { QuestionType } from '../../Model/questiondata.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionServiceService } from '../../Services/question-service.service';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {

  constructor(private service:QuestionServiceService){

  }

  FormData!:QuestionType;

  questionForm =new FormGroup({
    qtitle: new FormControl(''),
    qcategory: new FormControl(''),
    option1: new FormControl(''),
    option2: new FormControl(''),
    option3: new FormControl(''),
    option4: new FormControl(''),
    qanswer: new FormControl(''),
    difficulty: new FormControl('Medium')
  });


  onSubmit(){
    this.FormData = this.questionForm.value as QuestionType
    this.service.AddQuestion(this.FormData)
    console.log(this.FormData);
  }

  

}
