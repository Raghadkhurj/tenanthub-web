import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Auth } from './auth';
import { environment } from '../../environments/environment';

describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('stores the token after login', () => {
    service.login('sara@orange.com', 'Pass1234', 'orange-company').subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/user/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'fake-token' });

    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('clears the token on logout', () => {
    localStorage.setItem('token', 'fake-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});