import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAddComponent } from './job-add.component';

describe('JobAddComponent', () => {
  let component: JobAddComponent;
  let fixture: ComponentFixture<JobAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobAddComponent]
    });
    fixture = TestBed.createComponent(JobAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
