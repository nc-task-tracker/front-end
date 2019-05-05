import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneeFormComponent } from './assignee-form.component';

describe('AssigneeFormComponent', () => {
  let component: AssigneeFormComponent;
  let fixture: ComponentFixture<AssigneeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigneeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
