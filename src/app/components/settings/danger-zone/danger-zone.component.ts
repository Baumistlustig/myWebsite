import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../http/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-danger-zone',
  templateUrl: './danger-zone.component.html',
  styleUrls: ['./danger-zone.component.scss'],
})
export class DangerZoneComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  deleteAccount(): void {
    this.userService
      .deleteUser(localStorage.getItem('user_id'))
      .subscribe(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');

        this.router.navigate(['/']);

        this.snackBar.open('Account deleted!', '', {
          duration: 3000,
        });
      });
  }

  openDialog(): void {
    const dialogRef: MatDialogRef<DeleteDialog> = this.dialog.open(
      DeleteDialog,
      {
        width: '450px',
      },
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAccount();
      }
    });
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<DangerZoneComponent>) {}

  ngOnInit(): void {}
}
