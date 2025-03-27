import { Component, OnInit } from '@angular/core';
import { ITweet } from '../../models/tweet.model';
import { Pageable } from '../../models/pageable.model';
import { TweetService } from '../../services/tweet.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TweetProfileComponent } from '../../components/tweet-profile/tweet-profile.component';
import { TweetListComponent } from '../../components/tweet-list/tweet-list.component';

@Component({
  selector: 'app-tweet-page',
  imports: [CommonModule, TweetProfileComponent, TweetListComponent],
  templateUrl: './tweet-page.component.html',
  styleUrl: './tweet-page.component.css'
})
export class TweetPageComponent implements OnInit{
  replyTweets: ITweet[] = [];
  parentTweetId: any;
  parentTweet?: ITweet;
  size: number = 10;
  lastId: number | undefined;
  isLoading: boolean = false;
  hasMoreTweets: boolean = true;

  constructor(private tweetService: TweetService, private activeRoute: ActivatedRoute) {
    this.parentTweetId = this.activeRoute.snapshot.paramMap.get('tweetId');
  }
  ngOnInit(): void {
    this.loadParentTweet();
  }

  loadParentTweet() {
    this.tweetService.getTweetById(this.parentTweetId).subscribe((data: ITweet) => {
      this.parentTweet = data;
    })
  }

  loadReplyTweets(): void {
    if (!this.hasMoreTweets || this.isLoading) {
      return;
    }
    console.log('MAKING DATABASE CALL');
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
