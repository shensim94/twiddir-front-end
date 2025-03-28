import { Component, Input } from '@angular/core';
import { ITweet } from '../../models/tweet.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tweet-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './tweet-profile.component.html',
  styleUrl: './tweet-profile.component.css'
})
export class TweetProfileComponent {
  @Input() tweet!:ITweet;
}
