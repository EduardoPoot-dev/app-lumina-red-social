import { Component, computed, DestroyRef, ElementRef, inject, input, output, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { User } from '@auth/interfaces';
import { UserService } from '@users/services/user-service';
import { environment } from 'src/environments/environment';

const HISTORY_KEY = 'search-history';
const MAX_ITEMS = 8;

@Component({
  selector: 'user-search',
  imports: [],
  templateUrl: './user-search.html',
})
export class UserSearch {
  backendUrl = environment.backendUrl
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private timer?: ReturnType<typeof setTimeout>;

  readonly placeholder = input('Buscar usuarios');
  /** Ruta base del perfil: navega a `${profilePath}/${id}`. */
  readonly profilePath = input('/users');
  readonly debounceMs = input(300);
  readonly minChars = input(2);

  protected readonly query = signal('');      // lo que se ve en el input
  private readonly term = signal('');         // texto ya con debounce (dispara la petición)
  protected readonly open = signal(false);
  protected readonly activeIndex = signal(-1);

  protected readonly users = rxResource({
    // params en undefined = no hay petición
    params: () => {
      const q = this.term();
      return q.length >= this.minChars() ? q : undefined;
    },
    stream: ({ params: q }) => this.userService.search(q),
  });

  protected readonly results = computed(() => this.users.value() ?? []);

  protected readonly showPanel = computed(
    () => this.open() && this.query().trim().length >= this.minChars(),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.open.set(true);
    this.activeIndex.set(-1);

    clearTimeout(this.timer);
    if (!value.trim()) {
      this.term.set('');
      return;
    }
    this.timer = setTimeout(() => this.term.set(value.trim()), this.debounceMs());
  }

  protected onKeydown(event: KeyboardEvent): void {
    const total = this.results().length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.open.set(true);
        if (total) this.activeIndex.update((i) => (i + 1) % total);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (total) this.activeIndex.update((i) => (i <= 0 ? total - 1 : i - 1));
        break;
      case 'Enter':
        event.preventDefault();
        this.goToActiveOrFirst();
        break;
      case 'Escape':
        this.open.set(false);
        this.activeIndex.set(-1);
        break;
    }
  }

  /** Enter / lupa: va al resultado resaltado, o al primero si no hay ninguno resaltado. */
  protected goToActiveOrFirst(): void {
    const list = this.results();
    const user = list[this.activeIndex()] ?? list[0];
    if (user) this.goToProfile(user);
  }

  protected goToProfile(user: User): void {
    clearTimeout(this.timer);
    this.query.set('');
    this.term.set('');
    this.open.set(false);
    this.activeIndex.set(-1);
    this.router.navigate([this.profilePath(), user.id]);


  }

  protected clear(): void {
    clearTimeout(this.timer);
    this.query.set('');
    this.term.set('');
    this.activeIndex.set(-1);
    this.host.nativeElement.querySelector('input')?.focus();
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
