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
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() commentId!: string | null;
  @Input() parentPost!: string;

  comment!: Post;
  editing: boolean | string = false;
  commentGroup!: FormGroup;
  domain: string = environment.domain;

  users: User[] = [];
  save: string = 'Save';
  edit: string = 'Edit';
  readingComments: boolean | string = false;
  writingComment: boolean | string = false;

  constructor(
    private readonly commentService: CommentService,
    public readonly router: Router,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getComment(this.commentId || '');
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
      this.comment = comment;
    });
  }

  userIsAuthor(authorId: string): boolean {
    return authorId === localStorage.getItem('user_id');
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.editing = false;

      this.snackBar.open('Comment deleted!', '', {
        duration: 3000,
      });
    });
  }

  saveComment(comment: Post) {
    comment.title = this.commentGroup.value.title;
    comment.content = this.commentGroup.value.content;

    this.commentService.editComment(comment).subscribe(() => {
      this.snackBar.open('Comment saved!', '', {
        duration: 3000,
      });
    });
    this.editing = false;
  }

  toggleComments(comment: Post) {
    if (this.readingComments === comment._id) {
      this.readingComments = false;
      return;
    }
    this.readingComments = comment._id;
  }
}
