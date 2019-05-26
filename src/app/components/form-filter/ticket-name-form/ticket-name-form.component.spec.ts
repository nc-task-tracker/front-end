import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketNameFormComponent } from './ticket-name-form.component';

describe('TicketNameFormComponent', () => {
  let component: TicketNameFormComponent;
  let fixture: ComponentFixture<TicketNameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketNameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
