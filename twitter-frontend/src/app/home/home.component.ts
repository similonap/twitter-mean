import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private twitterService: TwitterService) { }

  ngOnInit(): void {
  }

  get Tweets() {
    return this.twitterService.Tweets;
  }

}
