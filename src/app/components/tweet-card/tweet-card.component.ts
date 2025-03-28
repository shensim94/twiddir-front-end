import { Component, Input, OnInit } from '@angular/core';
import { ITweet } from '../../models/tweet.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-tweet-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './tweet-card.component.html',
  styleUrl: './tweet-card.component.css'
})
export class TweetCardComponent implements OnInit {
  @Input() tweet!: ITweet;
  isOnTweetPage: boolean = false;
  parentUsername: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tweetService: TweetService
  ) {}

  ngOnInit(): void {
    // Check if we're on a tweet page route
    this.isOnTweetPage = this.router.url.includes('/status/');
    
    // Get parent tweet username if available
    if (this.tweet?.parentTweetId) {
      this.loadParentTweetUsername();
    }
  }

  loadParentTweetUsername(): void {
    // You need to get the username of the parent tweet
    this.tweetService.getTweetById(this.tweet.parentTweetId).subscribe({
      next: (parentTweet: ITweet) => {
        this.parentUsername = parentTweet.user.username;
      },
      error: (error) => {
        console.error('Error loading parent tweet:', error);
        // Fallback to a default or handle the error as needed
      }
    });
  }

  onCardClick(): void {
    
    this.router.navigate(['/', this.tweet.user.username, 'status', this.tweet.id]);
  }
}