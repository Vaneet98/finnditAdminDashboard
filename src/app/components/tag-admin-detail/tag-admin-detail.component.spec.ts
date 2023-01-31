import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAdminDetailComponent } from './tag-admin-detail.component';

describe('TagAdminDetailComponent', () => {
  let component: TagAdminDetailComponent;
  let fixture: ComponentFixture<TagAdminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagAdminDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
