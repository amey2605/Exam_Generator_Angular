import { Injectable } from '@angular/core';
import { Answers, CorrectAnswer, filterData, Questions } from '../Model/Filterdata.model';
import { HttpClient } from '@angular/common/http';  // ✅ correct import
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {


  constructor(private http: HttpClient,private router:Router) { 
    
  }  // ✅ correct injection

  ngOnInit(){
    
  }

  formData: filterData | undefined ;

  Total:number| undefined;
  Score:number|undefined;
  correctAnswers$!: Observable<CorrectAnswer[]>;
  isExamFinished:boolean=false;
  

   private apiUrl = 'http://localhost:8080/exam/array';

  getFilteredQuestions(filters: filterData): Observable<Questions[]> {
  console.log('Sending filters:', filters);
  return this.http.post<Questions[]>(this.apiUrl, filters, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

  examQuestions :Questions[]=[];  

  onStartExam() {
    //console.log('In service:', this.formData);

    if (!this.formData) {
    console.error('Filter data is missing!');
    return;
  }


  this.getFilteredQuestions(this.formData).subscribe({
    next: (questions: Questions[]) => {
      this.examQuestions = questions;
      //console.log('Questions stored:', this.examQuestions);
       this.router.navigate(['/exam']);
    },
    error: (err) => {
      console.error('Error fetching questions:', err);
    }
  });





  }

onSubmitExam(ans: { qid: number; answer: string }[]): Observable<{ correctAnswers: CorrectAnswer[], score: number }> {
  return forkJoin({
    correctAnswers: this.http.post<CorrectAnswer[]>('http://localhost:8080/answers/correct', ans),
    score: this.http.post<number>('http://localhost:8080/answers/score', ans)
  });

  this.isExamFinished=true;
}

  


  getQuestions(){
    
  }

}
