import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filterData } from '../Model/Filterdata.model';
import { ExamServiceService } from '../Services/exam-service.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule,RouterLink],
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  constructor(private service: ExamServiceService, private router: Router) {}

  categories = ['Java', 'SQL', 'Angular'];
  difficulties = ['easy', 'medium', 'hard'];

  filterForm = new FormGroup({
    category: new FormGroup({
      Java: new FormControl(false),
      SQL: new FormControl(false),
      Angular: new FormControl(false)
    }),
    difficulty: new FormGroup({
      easy: new FormControl(false),
      medium: new FormControl(false),
      hard: new FormControl(false)
    }),
    no: new FormControl('5')
  });

  onSubmit() {
    const formValue = this.filterForm.value;

    const selectedCategories = Object.entries(formValue.category  ?? {})
      .filter(([_, isChecked]) => isChecked)
      .map(([category]) => category);

    const selectedDifficulties = Object.entries(formValue.difficulty  ?? {})
      .filter(([_, isChecked]) => isChecked)
      .map(([difficulty]) => difficulty);

    const payload: filterData = {
      category: selectedCategories,
      difficulty: selectedDifficulties,
      no: formValue.no ?? '5'
    };

    this.service.getFilteredQuestions(payload).subscribe(
      (data) => {
        this.service.examQuestions = data; // Store in service for exam display
        this.router.navigate(['/exam']);
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }
}
