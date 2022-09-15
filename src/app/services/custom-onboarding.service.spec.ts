import { TestBed } from '@angular/core/testing';

import { CustomOnboardingService } from './custom-onboarding.service';

describe('CustomOnboardingService', () => {
  let service: CustomOnboardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomOnboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
