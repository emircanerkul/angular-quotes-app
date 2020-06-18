import { TestBed, async, inject } from '@angular/core/testing';

import { AnonymousOnlyGuard } from './anonymous-only.guard';

describe('AnonymousOnlyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonymousOnlyGuard]
    });
  });

  it('should ...', inject([AnonymousOnlyGuard], (guard: AnonymousOnlyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
