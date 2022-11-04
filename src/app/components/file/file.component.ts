import { Component, OnInit } from '@angular/core';
import { UserService } from '../../http/services/user.service';
import { environment } from '../../../environments/environment';
import { FileService } from '../../http/services/file.service';
import { ImageDialogComponent } from './dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
  ) {}

  files!: any[];
  recentFiles!: any[];
  fileName = '';

  formData: FormData = new FormData();

  userId: string = localStorage.getItem('user_id') || '';
  user!: any;
  domain: string = environment.domain;
  search!: string;

  ngOnInit(): void {
    this.getUser();
    this.getImages();
  }

  getUser(): void {
    this.userService.getUserById(this.userId).subscribe((user: any) => {
      this.user = user;
    });
  }

  getImages(): void {
    this.fileService.getFiles().subscribe((files: any) => {
      this.files = files;
      this.recentFiles = this.getRecentFiles();
    });
  }

  getRecentFiles() {
    return this.files.slice().reverse().slice(0, 5);
  }

  convertDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  userIsLoggedIn() {
    return localStorage.getItem('user_id') !== null;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      this.formData.append('file', file);

      this.fileService.uploadFile(this.formData).subscribe(() => {
        this.getImages();
        this.snackbar.open('File uploaded!', '', {
          duration: 3000,
        });

        this.fileName = '';
      }, (e: HttpErrorResponse) => {
        if (e.status === 400 && e.error.message === 'File too large!') {
          this.snackbar.open('File too large!', '', {
            duration: 3000,
          });
          this.fileName = '';

          return;
        }

        this.snackbar.open('Something went wrong!', '', {
          duration: 3000,
        });

        this.fileName = '';
      });
    }
  }

  searchFiles(): any {
    if (this.search) {
      return this.files.filter((file) => {
        return file.filename.toLowerCase().includes(this.search.toLowerCase());
      });
    }

    return this.files;
  }

  openDialog(imageId: string): void {
    const image: any = this.files.filter((image) => image.id === imageId);

    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: image[0],
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getImages();
    });
  }
}
