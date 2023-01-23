import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessessComponent } from './businessess.component';

describe('BusinessessComponent', () => {
  let component: BusinessessComponent;
  let fixture: ComponentFixture<BusinessessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
