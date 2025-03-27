import { Component, OnInit } from '@angular/core';
import { TweetListComponent } from '../../components/tweet-list/tweet-list.component';
import { TweetService } from '../../services/tweet.service';
import { IUser } from '../../models/user.model';
import { Pageable } from '../../models/pageable.model';
import { ITweet } from '../../models/tweet.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';

@Component({
  selector: 'app-user-page',
  imports: [CommonModule, TweetListComponent, UserProfileComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit{
  userTweets: ITweet[] = [];
  username: any;
  user?: IUser;
  size: number = 10;
  lastId: number | undefined;
  isLoading: boolean = false;
  hasMoreTweets: boolean = true;


  constructor(private tweetService: TweetService, private activeRoute: ActivatedRoute) {
    this.username = this.activeRoute.snapshot.paramMap.get('username');
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void{
    this.tweetService.getUserProfile(this.username).subscribe((data: IUser)=>{
      this.user = data;
    })
  }

  loadUserTweets(): void {
    if (!this.hasMoreTweets || this.isLoading) {
      return;
    }
    console.log('MAKING DATABASE CALL');
    this.isLoading = true;
    this.tweetService.getTweetsFromUser(this.username, this.size, this.lastId).subscribe({
      next: (data: Pageable<ITweet>) => {
        // If we received fewer items than requested, we've reached the end
        if (data.content.length < this.size) {
          this.hasMoreTweets = false;
        }

        this.userTweets = [...this.userTweets, ...data.content];
        
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
