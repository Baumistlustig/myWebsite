import { Component, OnInit } from "@angular/core";
import { PostsService } from "../../http/services/posts.service";
import { Post } from "../../models/posts.models";
import { environment } from "../../../environments/environment";
import { UserService } from "../../http/services/user.service";
import { User } from "../../models/user.model";
import { FormControl, FormGroup } from "@angular/forms";

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

  postGroup!: FormGroup;

  posts: Post[] = [];

  users: User[] = [];

  userId: string = localStorage.getItem("user_id") || "";
  domain: string = environment.domain;

  editing: boolean | string = false;

  save: string = "Save";
  edit: string = "Edit";

  ngOnInit(): void {
    this.getPosts();
  }

  initForm(post: Post): void {
    this.editing = post._id;

    this.postGroup = new FormGroup({
      title: new FormControl(post.title, []),
      content: new FormControl(post.content, [])
    });
  }

  getPosts(): void {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;

      this.getUsers();
    });
  }

  getUsers(): void {
    for (let i = 0; i < this.posts.length; i++) {
      this.userService
        .getUser(this.posts[i].authorId)
        .subscribe((user: any) => {
          this.users.push(user);
        });
    }
  }

  convertDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  savePost(post: Post): void {
    post.title = this.postGroup.value.title;
    post.content = this.postGroup.value.content;

    this.postService.editPost(post).subscribe(() => {
      this.getPosts();
    });
    this.editing = false;
  }

  userIsAuthor(authorId: string): boolean {
    return authorId === localStorage.getItem("user_id");
  }

  deletePost(post_id: string): void {
    this.postService.deletePost(post_id).subscribe(() => {
      this.getPosts();
    });
  }

  //Voting functions
  voteUp = (i: number) => {
    if (
      this.posts[i].dislikedBy.includes(localStorage.getItem("user_id") || "")
    ) {
      //remove element
      const userIndex = this.posts[i].dislikedBy.indexOf(
        localStorage.getItem("user_id") || ""
      );
      this.posts[i].dislikedBy.splice(userIndex, 1);
    }
    if (
      !this.posts[i].likedBy.includes(localStorage.getItem("user_id") || "")
    ) {
      // append element
      this.posts[i].likedBy.push(localStorage.getItem("user_id") || "");
    } else {
      //remove element
      const userIndex = this.posts[i].likedBy.indexOf(
        localStorage.getItem("user_id") || ""
      );
      this.posts[i].likedBy.splice(userIndex, 1);
    }

    this.postService.upvote(this.posts[i]._id);
  };

  voteDown = (i: number) => {
    if (this.posts[i].likedBy.includes(localStorage.getItem("user_id") || "")) {
      //remove element
      const userIndex = this.posts[i].likedBy.indexOf(
        localStorage.getItem("user_id") || ""
      );
      this.posts[i].likedBy.splice(userIndex, 1);
    }
    if (
      !this.posts[i].dislikedBy.includes(localStorage.getItem("user_id") || "")
    ) {
      // append element
      this.posts[i].dislikedBy.push(localStorage.getItem("user_id") || "");
    } else {
      //remove element
      const userIndex = this.posts[i].dislikedBy.indexOf(
        localStorage.getItem("user_id") || ""
      );
      this.posts[i].dislikedBy.splice(userIndex, 1);
    }

    this.postService.downvote(this.posts[i]._id);
  };

  returnVoted(post: Post, type: boolean) {
    if (type) {
      return post.likedBy.includes(this.userId) ? "accent" : "none";
    }
    return post.dislikedBy.includes(this.userId) ? "accent" : "none";
  }
}
