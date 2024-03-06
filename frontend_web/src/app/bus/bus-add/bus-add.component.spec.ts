import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusAddComponent } from './bus-add.component';

describe('BusAddComponent', () => {
  let component: BusAddComponent;
  let fixture: ComponentFixture<BusAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusAddComponent]
    });
    fixture = TestBed.createComponent(BusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
