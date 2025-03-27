import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITweet } from '../../models/tweet.model';
import { Router, RouterModule } from '@angular/router';
import { TweetCardComponent } from '../tweet-card/tweet-card.component';

@Component({
  selector: 'app-tweet-list',
  imports: [CommonModule, RouterModule, TweetCardComponent],
  templateUrl: './tweet-list.component.html',
  styleUrl: './tweet-list.component.css'
})
export class TweetListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() tweets?: ITweet[];
  @Input() loadTweets!: () => void;
  @ViewChild('observer') observer!: ElementRef;
  
  private intersectionObserver!: IntersectionObserver;
  private hasLoadedInitial = false;

  ngOnInit() {
    this.loadTweets();
    this.hasLoadedInitial = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setupIntersectionObserver();
      this.checkInitialVisibility();
    }, 100); // Small delay to allow data to load
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  onClick(tweet: ITweet) {
    // Implement click handling
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && this.hasLoadedInitial) {
        this.loadTweets();
      }
    }, options);

    if (this.observer?.nativeElement) {
      this.intersectionObserver.observe(this.observer.nativeElement);
    }
  }

  private checkInitialVisibility(): void {
    if (!this.observer?.nativeElement) return;

    const rect = this.observer.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if the observer element is fully or partially in viewport
    const isVisible = (
      rect.top >= 0 &&
      rect.top <= windowHeight
    ) || (
      rect.bottom >= 0 &&
      rect.bottom <= windowHeight
    );
    console.log('hello check initial visibility');
    console.log(isVisible)
    console.log(this.tweets?.length)
    console.log(this.hasLoadedInitial)
    if (isVisible && this.tweets?.length && this.hasLoadedInitial) {
      this.loadTweets();
    }
  }
}
