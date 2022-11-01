import { Component, OnInit } from '@angular/core';
import { UserService } from '../../http/services/user.service';
import { environment } from '../../../environments/environment';
import { FileService } from '../../http/services/file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  fileIds!: string[];

  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService
  ) { }

  userId: string = localStorage.getItem('user_id') || '';
  user!: any;
  domain: string = environment.domain;

  ngOnInit(): void {
    this.getUser();
    this.getImageIds();
  }

  getUser(): void {
    this.userService.getUserById(this.userId).subscribe((user: any) => {
      this.user = user;
    });
  }

  getImageIds(): void {
    this.fileService.getFiles().subscribe((files: any) => {
      this.fileIds = files;
    });
  }

}
