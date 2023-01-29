import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubL2Component } from './category-sub-l2.component';

describe('CategorySubL2Component', () => {
  let component: CategorySubL2Component;
  let fixture: ComponentFixture<CategorySubL2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySubL2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySubL2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
