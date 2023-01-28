import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubL1Component } from './category-sub-l1.component';

describe('CategorySubL1Component', () => {
  let component: CategorySubL1Component;
  let fixture: ComponentFixture<CategorySubL1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySubL1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySubL1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
