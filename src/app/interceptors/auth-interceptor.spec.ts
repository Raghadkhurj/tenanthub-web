import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './auth-interceptor';
import { environment } from '../../environments/environment';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'login', children: [] }]),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.setItem('token', 'fake-token');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('adds the token to API requests', () => {
    http.get(`${environment.apiUrl}/current-user`).subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/current-user`);
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush({});
  });

  it('does not add the token to other websites', () => {
    http.get('https://example.com/data').subscribe();
    const req = httpMock.expectOne('https://example.com/data');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('clears the token on a 401 response', () => {
    http.get(`${environment.apiUrl}/current-user`).subscribe({ error: () => {} });
    const req = httpMock.expectOne(`${environment.apiUrl}/current-user`);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    expect(localStorage.getItem('token')).toBeNull();
  });
});