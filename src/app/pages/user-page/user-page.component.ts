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
  imports: [TweetListComponent, CommonModule, UserProfileComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit{
  tweetPage?: Pageable<ITweet>;
  userTweets: ITweet[] = [];
  username: any;
  user?: IUser;


  constructor(private tweetService: TweetService, private activeRoute: ActivatedRoute) {
    this.username = this.activeRoute.snapshot.paramMap.get('username');
    this.loadUserProfile();
  }

  ngOnInit(): void {
    
    this.loadUserTweets();
  }

  loadUserTweets(): void{
    this.tweetService.getTweetsFromUser(this.username).subscribe((data: Pageable<ITweet>)=>{
      this.userTweets = data.content;
    })
  }

  loadUserProfile(): void{
    this.tweetService.getUserProfile(this.username).subscribe((data: IUser)=>{
      this.user = data;
    })
  }

}
