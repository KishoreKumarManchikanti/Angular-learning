import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-panel',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.scss',
})
export class NavPanelComponent {}
