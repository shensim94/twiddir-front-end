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
export class HomePageComponent implements OnInit{
  tweetPage?: Pageable<ITweet>;
  allTweets: ITweet[] = [];
  constructor(private tweetService: TweetService) {
    
  }
  ngOnInit(): void {
    this.loadAllTweets();
  }

  loadAllTweets(): void{
    this.tweetService.getAllTweets().subscribe((data: Pageable<ITweet>)=>{
      this.allTweets = data.content;
    })
  }
}
