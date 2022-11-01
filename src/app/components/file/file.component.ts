import { Component, OnInit } from '@angular/core';
import { UserService } from '../../http/services/user.service';
import { environment } from '../../../environments/environment';
import { FileService } from '../../http/services/file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  files!: any[];
  fileName = '';

  formData: FormData = new FormData();

  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  userId: string = localStorage.getItem('user_id') || '';
  user!: any;
  domain: string = environment.domain;

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
    });
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
      });
    }
  }
}
