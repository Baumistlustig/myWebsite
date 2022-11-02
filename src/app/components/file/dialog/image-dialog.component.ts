import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { FileService } from '../../../http/services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  id: string;
  filename: string;
  uploaded: Date;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent implements OnInit {
  constructor(
    private readonly fileService: FileService,
    private readonly snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  domain: string = environment.domain;

  ngOnInit(): void {}

  convertDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  deleteFile(id: string) {
    this.fileService.deleteFile(id).subscribe(() => {
      this.dialogRef.close();
    });
  }

  copiedUrl(): void {
    this.snackBar.open('Copied URL!', '', { duration: 3000 });
  }
}
