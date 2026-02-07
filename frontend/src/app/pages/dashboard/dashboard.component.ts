import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  stats = signal<any[]>([
    { label: 'Total Users', value: '1,234', icon: '👥', change: '+12%' },
    { label: 'Active Sessions', value: '567', icon: '📊', change: '+5%' },
    { label: 'Revenue', value: '$12,345', icon: '💰', change: '+23%' },
    { label: 'Conversion', value: '3.2%', icon: '📈', change: '+0.5%' },
  ]);

  serverMessage = signal<string>('');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchServerData();
  }

  fetchServerData() {
    this.http.get<{ message: string }>('http://localhost:3000/api').subscribe({
      next: (response) => {
        this.serverMessage.set(response.message);
      },
      error: () => {
        this.serverMessage.set('Backend not connected. Start the NestJS server!');
      },
    });
  }
}
