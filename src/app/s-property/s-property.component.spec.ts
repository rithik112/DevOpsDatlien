import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPropertyComponent } from './s-property.component';

describe('SPropertyComponent', () => {
  let component: SPropertyComponent;
  let fixture: ComponentFixture<SPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
