import { TestBed } from '@angular/core/testing';

import { DashBoardGuardGuard } from './dash-board-guard.guard';

describe('DashBoardGuardGuard', () => {
  let guard: DashBoardGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashBoardGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
