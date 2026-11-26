import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '@users/services/user-service';
import { NavAside } from '@shared/components/nav-aside/nav-aside';
import { TopBar } from '@shared/components/top-bar/top-bar';

@Component({
  imports: [RouterOutlet, NavAside, TopBar],
  selector: 'app-user-layout',
  templateUrl: './user-layout.html',
})
export class UserLayout {
  
}
