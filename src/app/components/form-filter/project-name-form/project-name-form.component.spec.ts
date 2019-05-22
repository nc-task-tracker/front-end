import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNameFormComponent } from './project-name-form.component';

describe('ProjectNameFormComponent', () => {
  let component: ProjectNameFormComponent;
  let fixture: ComponentFixture<ProjectNameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
