import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Login } from './login';
import { Auth } from '../../services/auth';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form is invalid when empty', () => {
    expect(component.loginForm.invalid).toBe(true);
  });

  it('does not call the API when the form is invalid', () => {
    const auth = TestBed.inject(Auth);
    const loginSpy = vi.spyOn(auth, 'login');

    component.onSubmit();

    expect(loginSpy).not.toHaveBeenCalled();
  });
});