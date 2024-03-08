import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditControlleurComponent } from './edit-controlleur.component';

describe('EditControlleurComponent', () => {
  let component: EditControlleurComponent;
  let fixture: ComponentFixture<EditControlleurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditControlleurComponent]
    });
    fixture = TestBed.createComponent(EditControlleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
