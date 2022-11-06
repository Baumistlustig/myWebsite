import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../http/services/user.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}
  domain: string = environment.domain;

  username: string = decodeURI(this.router.url.split('/')[2]);
  user!: any | User;
  profile!: any;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService
      .getUserByName(this.router.url.split('/')[2])
      .subscribe((user: any) => {
        this.user = user;
        this.getUserProfile(user.id);
      });
  }

  getUserProfile(userId: string): void {
    this.userService.getProfile(userId).subscribe((user: any) => {
      this.profile = user;
    });
  }

  userLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  returnFollows(): boolean {
    return this.profile.followers.includes(this.user.id);
  }

  toggleFollow(): void {
    this.userService.toggleFollow(this.user.id).subscribe(() => {
      this.getUser();
    });
  }
}
