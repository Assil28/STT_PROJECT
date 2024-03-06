import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddComponent } from './company-add.component';

describe('CompanyAddComponent', () => {
  let component: CompanyAddComponent;
  let fixture: ComponentFixture<CompanyAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAddComponent]
    });
    fixture = TestBed.createComponent(CompanyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
