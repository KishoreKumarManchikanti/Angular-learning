import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavPanelComponent } from './components/nav-panel/nav-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
