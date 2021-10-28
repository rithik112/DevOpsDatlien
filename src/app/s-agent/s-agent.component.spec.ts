import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAgentComponent } from './s-agent.component';

describe('SAgentComponent', () => {
  let component: SAgentComponent;
  let fixture: ComponentFixture<SAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
