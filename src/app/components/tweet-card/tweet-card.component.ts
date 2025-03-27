import { Component, Input, input } from '@angular/core';
import { ITweet } from '../../models/tweet.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tweet-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './tweet-card.component.html',
  styleUrl: './tweet-card.component.css'
})
export class TweetCardComponent {
  @Input() tweet!: ITweet;

  constructor(private router: Router){}
}
