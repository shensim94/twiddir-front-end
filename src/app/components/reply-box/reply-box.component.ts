import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-reply-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reply-box.component.html',
  styleUrl: './reply-box.component.css'
})
export class ReplyBoxComponent {
  @Input() parentTweetId!: number;
  replyContent: string = '';

  constructor(
    private tweetService: TweetService,
    private router: Router
  ) {}

  onClickPost() {
    if (this.replyContent.trim() && this.replyContent.length <= 280) {
      // Call the service to post the reply
      this.tweetService.replyToTweet(this.parentTweetId, {
        content: this.replyContent
      }).subscribe({
        next: () => {
          // Clear the input after successful post
          this.replyContent = '';
          
          // Reload the current route to refresh the replies
          const currentUrl = this.router.url;
          // url: username/status/id
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
          });
        },
        error: (error) => {
          console.error('Error posting reply:', error);
        }
      });
    }
  }
}