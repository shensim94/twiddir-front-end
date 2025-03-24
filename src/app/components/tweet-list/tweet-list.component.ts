import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITweet } from '../../models/tweet.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tweet-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './tweet-list.component.html',
  styleUrl: './tweet-list.component.css'
})
export class TweetListComponent {
  @Input() tweets?: ITweet[];

  constructor(private router: Router){}
  
  onClick(tweet: ITweet){
  }

  onUsernameClick(tweet: ITweet){
    this.router.navigate(['/', tweet.user.username]);
  }
}
