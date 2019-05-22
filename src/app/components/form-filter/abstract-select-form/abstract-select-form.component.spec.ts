import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractSelectFormComponent } from './abstract-select-form.component';

describe('AbstractSelectFormComponent', () => {
  let component: AbstractSelectFormComponent;
  let fixture: ComponentFixture<AbstractSelectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractSelectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractSelectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
