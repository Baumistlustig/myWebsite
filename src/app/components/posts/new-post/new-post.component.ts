import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PostsService } from "../../../http/services/posts.service";
import { UserService } from '../../../http/services/user.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly postService: PostsService,
    private readonly userService: UserService
    ) { }

  newPostForm!: FormGroup;

  userId: string = localStorage.getItem('user_id') || '';

  user: any;
  domain: string = environment.domain;

  ngOnInit(): void {+
    this.initForm();
    this.getUser();
  }

  initForm(): void {
    this.newPostForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.maxLength(24)]),
      content: new FormControl("", [Validators.required])
    });
  }

  getDate(): string {
    return new Date().toLocaleString();
  }

  getUser(): void {
    this.userService.getUserById(this.userId).subscribe((user: any) => {
      this.user = user;
    });
  }

  newPost(): void {

    this.postService.createPost(this.newPostForm.value).subscribe(() => {
      this.dialog.closeAll();
    });
  }
}
