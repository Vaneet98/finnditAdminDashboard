import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisitingComponent } from './lisiting.component';

describe('LisitingComponent', () => {
  let component: LisitingComponent;
  let fixture: ComponentFixture<LisitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LisitingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LisitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
