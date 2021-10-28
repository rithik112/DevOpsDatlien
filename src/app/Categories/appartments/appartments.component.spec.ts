import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartmentsComponent } from './appartments.component';

describe('AppartmentsComponent', () => {
  let component: AppartmentsComponent;
  let fixture: ComponentFixture<AppartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
