import { Injectable } from '@angular/core';
import { Answers, CorrectAnswer, filterData, Questions } from '../Model/Filterdata.model';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  formData: filterData | undefined;
  Total: number | undefined;
  Score: number | undefined;
  correctAnswers$!: Observable<CorrectAnswer[]>;
  isExamFinished: boolean = false;

  //  base URL
  private baseApiUrl = 'https://044c-2401-4900-1c16-ab9-c96d-17e0-572c-884c.ngrok-free.app';

  // base URL in API endpoint
  private filterQuestionsUrl = `${this.baseApiUrl}/exam/array`;
  private correctAnswersUrl = `${this.baseApiUrl}/answers/correct`;
  private scoreUrl = `${this.baseApiUrl}/answers/score`;

  examQuestions: Questions[] = [];

  getFilteredQuestions(filters: filterData): Observable<Questions[]> {
    console.log('Sending filters:', filters);
    return this.http.post<Questions[]>(this.filterQuestionsUrl, filters, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  onStartExam() {
    if (!this.formData) {
      console.error('Filter data is missing!');
      return;
    }

    this.getFilteredQuestions(this.formData).subscribe({
      next: (questions: Questions[]) => {
        this.examQuestions = questions;
        this.router.navigate(['/exam']);
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
      }
    });
  }

  onSubmitExam(ans: { qid: number; answer: string }[]): Observable<{ correctAnswers: CorrectAnswer[], score: number }> {
    this.isExamFinished = true;
    return forkJoin({
      correctAnswers: this.http.post<CorrectAnswer[]>(this.correctAnswersUrl, ans),
      score: this.http.post<number>(this.scoreUrl, ans)
    });
  }

  getQuestions() {
    
  }
}
