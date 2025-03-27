import { Component, Input } from '@angular/core';
import { ITweet } from '../../models/tweet.model';

@Component({
  selector: 'app-tweet-profile',
  imports: [],
  templateUrl: './tweet-profile.component.html',
  styleUrl: './tweet-profile.component.css'
})
export class TweetProfileComponent {
  @Input() tweet?:ITweet;
}
