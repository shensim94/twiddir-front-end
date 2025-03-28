import { Component, OnDestroy, OnInit } from '@angular/core';
import { TweetListComponent } from '../../components/tweet-list/tweet-list.component';
import { TweetService } from '../../services/tweet.service';
import { IUser } from '../../models/user.model';
import { Pageable } from '../../models/pageable.model';
import { ITweet } from '../../models/tweet.model';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  imports: [CommonModule, TweetListComponent, UserProfileComponent, NavbarComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit, OnDestroy{
  userTweets: ITweet[] = [];
  username: any;
  user?: IUser;
  size: number = 10;
  lastId: number | undefined;
  isLoading: boolean = false;
  hasMoreTweets: boolean = true;
  private routeSub!: Subscription;


  constructor(private tweetService: TweetService, private activeRoute: ActivatedRoute) {
  }
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    //this.username = this.activeRoute.snapshot.paramMap.get('username');
    this.routeSub = this.activeRoute.params.subscribe((params: Params) => {
      this.username = params['username']; // Assuming 'id' is your route parameter
      // Perform actions based on the new parameter value, e.g., fetch data
      this.reset();
      this.loadUserProfile();
      this.loadUserTweets();
    });
  }

  loadUserProfile(): void{
    this.tweetService.getUserProfile(this.username).subscribe((data: IUser)=>{
      this.user = data;
    })
  }

  private reset(): void {
    this.userTweets = [];
    this.lastId = undefined;
    this.isLoading = false;
    this.hasMoreTweets = true;
  }

  loadUserTweets(): void {
    if (!this.hasMoreTweets || this.isLoading) {
      return;
    }
    
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
