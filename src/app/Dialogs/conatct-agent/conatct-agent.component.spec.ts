import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConatctAgentComponent } from './conatct-agent.component';

describe('ConatctAgentComponent', () => {
  let component: ConatctAgentComponent;
  let fixture: ComponentFixture<ConatctAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConatctAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConatctAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
