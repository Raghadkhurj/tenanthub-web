import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { authGuard } from './auth-guard';
import { Auth } from '../services/auth';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('allows a logged-in user', () => {
    vi.spyOn(TestBed.inject(Auth), 'isLoggedIn').mockReturnValue(true);
    const result = executeGuard({} as any, {} as any);
    expect(result).toBe(true);
  });
  it('redirects a logged-out user to /login', () => {
    vi.spyOn(TestBed.inject(Auth), 'isLoggedIn').mockReturnValue(false);
    const router = TestBed.inject(Router);
    const result = executeGuard({} as any, {} as any);

    expect(router.serializeUrl(result as UrlTree)).toBe('/login');
  });
});
