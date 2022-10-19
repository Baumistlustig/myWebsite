import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.router.navigate(['/']);
  }
}
