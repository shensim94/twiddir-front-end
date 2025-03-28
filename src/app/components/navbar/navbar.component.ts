import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username: string;

  constructor(private router: Router, private tweetService: TweetService){
    this.username = tweetService.getCurrentUsername();
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
