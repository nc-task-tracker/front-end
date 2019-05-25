import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneeSearchComponent } from './assignee-search.component';

describe('AssigneeSearchComponent', () => {
  let component: AssigneeSearchComponent;
  let fixture: ComponentFixture<AssigneeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigneeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
