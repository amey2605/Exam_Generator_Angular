import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionType } from '../Model/questiondata.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http:HttpClient) { }

  AllQuestions!:QuestionType[];
  

  AddQuestion(FormData:QuestionType):void{
   this.http.post<QuestionType>('http://localhost:8080/questions', FormData).subscribe((res)=>{
    console.log(res)
   })

  }

  getAllQuestions():Observable<QuestionType[]>{
    
     return this.http.get<QuestionType[]>('http://localhost:8080/questions')
  }

}
