import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRegiComponent } from './d-regi.component';

describe('DRegiComponent', () => {
  let component: DRegiComponent;
  let fixture: ComponentFixture<DRegiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DRegiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DRegiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
