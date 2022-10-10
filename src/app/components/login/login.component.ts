import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

export interface DialogData {
  username: string;
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

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '450px',
      data: { name: this.username, animal: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.username = result.username;
      this.password = result.password;

      console.log(this.username, this.password);
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
    @Inject(MAT_DIALOG_DATA) public credentials: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
