import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../http/services/posts.service';
import { Post } from '../../models/posts.models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private readonly postService: PostsService) {}

  posts: Post[] = [];

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  convertDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  userIsAuthor(authorId: string): boolean {
    return authorId === localStorage.getItem('user_id');
  }
}
