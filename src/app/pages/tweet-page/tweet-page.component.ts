import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITweet } from '../../models/tweet.model';
import { Pageable } from '../../models/pageable.model';
import { TweetService } from '../../services/tweet.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TweetProfileComponent } from '../../components/tweet-profile/tweet-profile.component';
import { TweetListComponent } from '../../components/tweet-list/tweet-list.component';
import { Subscription } from 'rxjs';
import { ReplyBoxComponent } from '../../components/reply-box/reply-box.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-tweet-page',
  imports: [CommonModule, TweetProfileComponent, TweetListComponent, ReplyBoxComponent, NavbarComponent],
  templateUrl: './tweet-page.component.html',
  styleUrl: './tweet-page.component.css'
})
export class TweetPageComponent implements OnInit, OnDestroy {
  replyTweets: ITweet[] = [];
  parentTweetId: any;
  parentTweet!: ITweet;
  size: number = 10;
  lastId: number | undefined;
  isLoading: boolean = false;
  hasMoreTweets: boolean = true;
  private routeSub!: Subscription;

  constructor(private tweetService: TweetService, private activeRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.routeSub = this.activeRoute.paramMap.subscribe(params => {
      // Reset component state when parameters change
      this.reset();
      
      // Get the new tweet ID
      this.parentTweetId = params.get('tweetId');
      
      
      // Load the parent tweet and replies
      this.loadParentTweet();
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  // Reset component state when navigating to a new tweet
  private reset(): void {
    this.replyTweets = [];
    this.lastId = undefined;
    this.isLoading = false;
    this.hasMoreTweets = true;
  }

  loadParentTweet() {
    this.tweetService.getTweetById(this.parentTweetId).subscribe((data: ITweet) => {
      this.parentTweet = data;
      // Once we have the parent tweet, load replies
      this.loadReplyTweets();
    });
  }

  loadReplyTweets(): void {
    if (!this.hasMoreTweets || this.isLoading) {
      return;
    }
    
    this.isLoading = true;
    this.tweetService.getRepliesFromTweet(this.parentTweetId, this.size, this.lastId).subscribe({
      next: (data: Pageable<ITweet>) => {
        // If we received fewer items than requested, we've reached the end
        if (data.content.length < this.size) {
          this.hasMoreTweets = false;
        }

        this.replyTweets = [...this.replyTweets, ...data.content];
        
        // Update lastId to the smallest ID in the current set
        if (data.content.length > 0) {
          const lastTweet = data.content[data.content.length - 1];
          this.lastId = lastTweet.id;
        }
      },
      error: (error) => {
        console.error('Error loading tweets:', error);
        this.hasMoreTweets = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
