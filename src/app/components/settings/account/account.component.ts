import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../http/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm('');
    this.getOldCredentials();
  }

  getOldCredentials(): void {
    this.userService
      .getUser(localStorage.getItem('user_id'))
      .subscribe((result: any) => {
        this.initForm(result.username);
      });
  }

  initForm(username: string): void {
    this.accountForm = new FormGroup({
      username: new FormControl(username, [Validators.required]),
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });
  }

  saveSettings(): void {
    if (this.accountForm.valid) {
      this.userService
        .editUser(
          this.accountForm.value.username,
          this.accountForm.value.email,
          this.accountForm.value.newPassword,
        )
        .subscribe(() => {
          this.snackBar.open('Saved your settings!', '', { duration: 3000 });
        });
    }
  }
}
