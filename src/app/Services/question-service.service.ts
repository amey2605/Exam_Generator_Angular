import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionType } from '../Model/questiondata.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http: HttpClient) { }

  AllQuestions!: QuestionType[];

  // ✅ Define base API URL
  private baseApiUrl = 'https://044c-2401-4900-1c16-ab9-c96d-17e0-572c-884c.ngrok-free.app';

  // ✅ Construct full endpoint URLs
  private questionsUrl = `${this.baseApiUrl}/questions`;

  AddQuestion(FormData: QuestionType): void {
    this.http.post<QuestionType>(this.questionsUrl, FormData).subscribe((res) => {
      console.log(res);
    });
  }

  getAllQuestions(): Observable<QuestionType[]> {

     const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });

    return this.http.get<QuestionType[]>(this.questionsUrl+'/getallquestions',{headers});
  }
}
