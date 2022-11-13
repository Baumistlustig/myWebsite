import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../http/services/comment.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../http/services/user.service';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/user.model';
import { Post } from '../../../models/posts.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() commentIds!: string[] | null;
  @Input() parentPost!: any;

  comments: any[] = [];
  editing: boolean | string = false;
  commentGroup!: FormGroup;
  domain: string = environment.domain;

  users: User[] = [];
  save: string = 'Save';
  edit: string = 'Edit';

  constructor(
    private readonly commentService: CommentService,
    public readonly router: Router,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getComments(this.commentIds);
  }

  initForm(comment: Post): void {
    this.editing = comment._id;

    this.commentGroup = new FormGroup({
      title: new FormControl(comment.title, []),
      content: new FormControl(comment.content, []),
    });
  }

  getComment(commentId: string): void {
    this.commentService.getComment(commentId).subscribe((comment) => {

      if (comment.comments) {
        this.getComments(comment.comments);
      }

      this.comments.push(comment);
    });
  }

  getComments(commentIds: string[] | null): void {
    if (!commentIds) { return; }
    for (let i = 0; i < commentIds.length; i++) {
      this.getComment(commentIds[i]);
    }

    this.getUsers();
  }

  convertDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  getUsers(): void {
    for (let i = 0; i < this.comments.length; i++) {
      this.userService
        .getUserById(this.comments[i].authorId)
        .subscribe((user: any) => {
          this.users.push(user);
        });
    }
  }

  userIsAuthor(authorId: string): boolean {
    return authorId === localStorage.getItem('user_id');
  }

  deleteComment(commentId: any) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.editing = false;
      this.getComments(this.commentIds);

      this.snackBar.open('Comment deleted!', '', {
        duration: 3000,
      });
    });

  }
}
