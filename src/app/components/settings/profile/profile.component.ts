import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../http/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileGroup!: FormGroup;
  fileName = '';

  formData: FormData = new FormData();
  user: any;

  constructor(private readonly userService: UserService) {}

  domain: string = environment.domain;
  userId: string = localStorage.getItem('user_id') || '';

  ngOnInit(): void {
    this.initForm();
    this.getUserName();
  }

  initForm() {
    this.profileGroup = new FormGroup({
      status: new FormControl('', []),
      bio: new FormControl('', []),
    });
  }

  getUserName(): void {
    this.userService.getUserById(this.userId).subscribe((user: any) => {
      this.user = user;
    });
  }

  saveSettings() {
    if (this.profileGroup.value.status || this.profileGroup.value.bio) {
      this.userService
        .editProfile(
          this.profileGroup.value.bio,
          this.profileGroup.value.status,
        )
        .subscribe(() => {});
    }

    if (this.fileName) {
      this.userService.uploadProfileImage(this.formData).subscribe(() => {
        window.location.reload();
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      this.formData.append('profile-picture', file);
    }
  }
}
