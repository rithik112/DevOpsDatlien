import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachHouseComponent } from './beach-house.component';

describe('BeachHouseComponent', () => {
  let component: BeachHouseComponent;
  let fixture: ComponentFixture<BeachHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeachHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeachHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
