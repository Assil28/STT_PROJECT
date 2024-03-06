import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostuledJobComponent } from './postuled-job.component';

describe('PostuledJobComponent', () => {
  let component: PostuledJobComponent;
  let fixture: ComponentFixture<PostuledJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostuledJobComponent]
    });
    fixture = TestBed.createComponent(PostuledJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
