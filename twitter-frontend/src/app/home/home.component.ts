import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { Tweet } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private tweets: Tweet[] = [];

  constructor(private twitterService: TwitterService) { }

  ngOnInit(): void {
    this.twitterService.getTweets().then(tweets => {
      this.tweets = tweets;
    });
  }

  get Tweets() {
    return this.tweets;
  }

}
