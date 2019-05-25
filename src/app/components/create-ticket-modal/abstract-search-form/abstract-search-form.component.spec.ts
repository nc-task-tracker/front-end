import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractSearchFormComponent } from './abstract-search-form.component';

describe('AbstractSearchFormComponent', () => {
  let component: AbstractSearchFormComponent;
  let fixture: ComponentFixture<AbstractSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
