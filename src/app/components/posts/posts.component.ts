import { Component, OnInit } from "@angular/core";
import { PostsService } from "../../http/services/posts.service";
import { Post, User } from "../../models/posts.models";
import { environment } from "../../../environments/environment";
import { UserService } from "../../http/services/user.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  constructor(
    private readonly postService: PostsService,
    private readonly userService: UserService
  ) {
  }

  posts: Post[] = [];

  users: User[] = [];

  userId: string = localStorage.getItem("user_id") || "";
  domain: string = environment.domain;

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;

      this.getUsers();
    });
  }

  getUsers(): void {
    for (let i = 0; i < this.posts.length; i++) {
      this.userService.getUser(this.posts[i].authorId).subscribe((user: any) => {
        this.users.push(user);
      });
    }
  }

  convertDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  userIsAuthor(authorId: string): boolean {
    return authorId === localStorage.getItem("user_id");
  }
}
