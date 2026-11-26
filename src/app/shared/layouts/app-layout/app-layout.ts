import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavAside } from 'src/app/shared/components/nav-aside/nav-aside';
import { TopBar } from 'src/app/shared/components/top-bar/top-bar';

@Component({
  imports: [NavAside, TopBar, RouterOutlet],
  selector: 'app-layout',
  templateUrl: './app-layout.html',
})
export class AppLayout {}
