import { TestBed, async, inject } from '@angular/core/testing';

import { MemberOnlyGuard } from './member-only.guard';

describe('MemberonlyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberOnlyGuard]
    });
  });

  it('should ...', inject([MemberOnlyGuard], (guard: MemberOnlyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
