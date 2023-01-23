import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantBannersComponent } from './marchant-banners.component';

describe('MarchantBannersComponent', () => {
  let component: MarchantBannersComponent;
  let fixture: ComponentFixture<MarchantBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchantBannersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchantBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
