import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../http/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
    ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '450px',
      data: { name: this.username, animal: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loginProcess(result.username, result.password);
    });
  }

  loginProcess(username: string, password: string) {
    this.authService.login({ username, password }).subscribe((result) => {
      localStorage.setItem('token', result.access_token);

      localStorage.setItem('user_id', result.id);

      this.snackBar.open('You successfully logged in!', '', {
        duration: 3000
      });
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
      this.snackBar.open(`Error: ${e.message}`, '',
        { duration: 3000 }
      );
    });
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'dialog.html',
})
export class LoginDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public credentials: DialogData,
    @Inject(MAT_DIALOG_DATA) public registerCredentials: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
