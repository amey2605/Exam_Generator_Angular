import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayExamComponent } from './display-exam.component';

describe('DisplayExamComponent', () => {
  let component: DisplayExamComponent;
  let fixture: ComponentFixture<DisplayExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayExamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
