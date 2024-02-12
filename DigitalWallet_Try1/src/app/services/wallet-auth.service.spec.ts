import { TestBed } from '@angular/core/testing';

import { WalletAuthService } from './wallet-auth.service';

describe('WalletAuthService', () => {
  let service: WalletAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
