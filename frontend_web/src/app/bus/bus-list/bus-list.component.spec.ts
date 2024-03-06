import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusListComponent } from './bus-list.component';

describe('BusListComponent', () => {
  let component: BusListComponent;
  let fixture: ComponentFixture<BusListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusListComponent]
    });
    fixture = TestBed.createComponent(BusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
