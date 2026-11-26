import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
import { RegisterData, User } from '@auth/interfaces';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.apiUrl;

@Service()
export class AuthService {

  private http = inject(HttpClient);

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));


  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._authStatus() === 'authenticated') {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());

  checkStatusResource = rxResource({
    stream: () => this.checkStatus()
  })

  register(registerData: RegisterData): Observable<boolean> {
    const { confirmPassword, ...data} = registerData;
    return this.http
      .post(`${baseUrl}/auth/register`, data)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<string>(`${baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((token) => {
          this.handleAuthSuccess(token)
        }),
        switchMap(() => this.checkStatus()),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  getMyUser(): Observable<User | null> {
    return this.http
      .get<User>(`${baseUrl}/auth/user`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
        .pipe(
          catchError(() => of(null))
        )
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http
      .get<User>(`${baseUrl}/auth/user`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .pipe(
        map((user) => {
          this.handleAuthSuccess(token)
          this._user.set(user)
          return true;
        }),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }

  private handleAuthSuccess(token: string) {
    localStorage.setItem('token', token)
    this._token.set(token)
    this._authStatus.set('authenticated');
    return true;
  }
}
