import { Component } from '@angular/core';
import { TweetService } from '../../services/tweet.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-box.component.html',
  styleUrl: './post-box.component.css'
})
export class PostBoxComponent {
  tweetContent: string = '';

  constructor(private tweetService: TweetService, private router: Router) {}

  onClickPost() {
    if (this.tweetContent.trim() && this.tweetContent.length <= 280) {
      // Call the service to post the tweet
      this.tweetService.postTweet({
        content: this.tweetContent
      }).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.error('Error posting tweet:', error);
        }
      });
    }
  }
}
