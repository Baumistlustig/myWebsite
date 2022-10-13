import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../http/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface DialogData {
  username: string;
  email: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string | undefined;
  password: string | undefined;

  constructor(
    private readonly dialog: MatDialog,
    ) { }

  openDialog(): void {
    const dialogRef: MatDialogRef<LoginDialog> = this.dialog.open(LoginDialog, {
      width: '450px',
      data: { name: this.username, animal: this.password }
    });
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'dialog.html',
})
export class LoginDialog implements OnInit {

  login!: FormGroup;
  register!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public credentials: DialogData,
    @Inject(MAT_DIALOG_DATA) public registerCredentials: DialogData) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.login = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.register = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }



  loginProcess() {
    if (this.login.valid) {
      this.authService.login({
        username: this.login.value.username,
        password: this.login.value.password
      }).subscribe((result) => {

        // Add token to localstorage
        localStorage.setItem('token', result.access_token);

        // Add userId to localstorage
        localStorage.setItem('user_id', result.id);

        // Open a snackbar
        this.snackBar.open('You successfully logged in!', '', {
          duration: 3000
        });

        // Close The dialog
        this.dialogRef.close();
      }, (e: HttpErrorResponse) => {
        if (e.status === 401) {
          this.snackBar.open('Wrong credentials!', '',
            { duration: 3000 }
          );
          return;
        }
        // Catch unverified users
        if (e.status === 403) {
          this.snackBar.open('Please verify your account first!', '',
            { duration: 3000 }
          );
          return;
        }

        // Catch all other errors
        this.snackBar.open(`Error: ${e.message}`, '',
          { duration: 3000 }
        );
      });
    }
  }

  registerProcess() {
    if (this.register.valid) {
      this.authService.register({
        username: this.register.value.username,
        email: this.register.value.email,
        password: this.register.value.password,
      }).subscribe(() => {

        this.snackBar.open('You successfully registered, please check your emails! (Also Spam)', '', {
          duration: 3000
        });

        // Close The dialog
        this.dialogRef.close();
      }, (e: HttpErrorResponse) => {
        if (e.status === 400) {
          this.snackBar.open('Username too long!', '',
            { duration: 3000 });
          return;
        }
        // Catch already existing usernames / emails
        if (e.status === 409) {
          // Catch already existing username
          if (e.error.message === 'user_already_exists') {
            this.snackBar.open('Username already exists!', '',
              { duration: 3000 });
            return;
          }
          // Catch already existing email
          if (e.error.message === 'email_already_exists') {
            this.snackBar.open('Email already exists!', '',
              { duration: 3000 });
            return;
          }
          return;
        }
        this.snackBar.open(`Error: ${e.message}`, '',
          { duration: 3000 });
      });
    }
  }
}
