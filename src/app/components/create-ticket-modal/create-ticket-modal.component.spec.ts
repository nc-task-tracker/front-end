import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketModalComponent } from './create-ticket-modal.component';

describe('CreateTicketModalComponent', () => {
  let component: CreateTicketModalComponent;
  let fixture: ComponentFixture<CreateTicketModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTicketModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
