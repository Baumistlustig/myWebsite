import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../../../http/services/comment.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  newCommentGroup!: FormGroup;

  @Input() parentId!: string | null;

  constructor(private readonly commentService: CommentService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newCommentGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  newComment(): void {
    const title = this.newCommentGroup.value.title;
    const content = this.newCommentGroup.value.content;

    this.commentService.newComment({ title, content, parent: this.parentId }).subscribe(() => {

      this.initForm();
    });
  }
}
