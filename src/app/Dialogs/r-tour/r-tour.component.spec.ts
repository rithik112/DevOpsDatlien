import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTourComponent } from './r-tour.component';

describe('RTourComponent', () => {
  let component: RTourComponent;
  let fixture: ComponentFixture<RTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
