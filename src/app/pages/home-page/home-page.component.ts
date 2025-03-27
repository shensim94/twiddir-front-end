import { Component, OnInit } from '@angular/core';
import { TweetListComponent } from '../../components/tweet-list/tweet-list.component';
import { Pageable } from '../../models/pageable.model';
import { ITweet } from '../../models/tweet.model';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-home-page',
  imports: [TweetListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  allTweets: ITweet[] = [];
  size: number = 10;
  lastId: number | undefined;
  isLoading: boolean = false;
  hasMoreTweets: boolean = true;

  constructor(private tweetService: TweetService) {}

  ngOnInit(): void {}

  loadAllTweets(): void {
    if (!this.hasMoreTweets || this.isLoading) {
      return;
    }
    console.log('MAKING DATABASE CALL');
    this.isLoading = true;
    this.tweetService.getAllTweets(this.size, this.lastId).subscribe({
      next: (data: Pageable<ITweet>) => {
        // If we received fewer items than requested, we've reached the end
        if (data.content.length < this.size) {
          this.hasMoreTweets = false;
        }

        this.allTweets = [...this.allTweets, ...data.content];
        
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
