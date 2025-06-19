import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { DisplayExamComponent } from './display-exam/display-exam.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { AddQuestionComponent } from './question-bank/add-question/add-question.component';

export const routes: Routes = [
    {path:'' ,component:HomeComponentComponent},
    {path:'exam',component:DisplayExamComponent},
    {path:'questions',component:QuestionBankComponent,
        children:[
            {path:'addquestion',component:AddQuestionComponent}
        ]
    }
];
