import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberModalComponent } from './project-member-modal.component';

describe('ProjectMemberModalComponent', () => {
  let component: ProjectMemberModalComponent;
  let fixture: ComponentFixture<ProjectMemberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMemberModalComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
