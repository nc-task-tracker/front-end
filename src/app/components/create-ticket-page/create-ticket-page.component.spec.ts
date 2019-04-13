import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTicketPageComponent} from './create-ticket-page.component';


describe('CreateTicketPageComponent', () => {
  let component: CreateTicketPageComponent;
  let fixture: ComponentFixture<CreateTicketPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTicketPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
