import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageAddParMoisComponent } from './voyage-add-par-mois.component';

describe('VoyageAddParMoisComponent', () => {
  let component: VoyageAddParMoisComponent;
  let fixture: ComponentFixture<VoyageAddParMoisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoyageAddParMoisComponent]
    });
    fixture = TestBed.createComponent(VoyageAddParMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
