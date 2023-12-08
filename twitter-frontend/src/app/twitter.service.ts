import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet,Profile } from '../types';
import twitterJson from '../twitter.json';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private httpClient: HttpClient) { }

  public get Tweets() {
    let tweets : Tweet[] =  twitterJson.tweets;
    let profiles: Profile[] = twitterJson.profiles;
    for (let tweet of tweets) {
      tweet.profile = profiles.find(p => p.handle === tweet.handle);
    }

    console.log(tweets);
    tweets.sort((a, b) => { 
      if (new Date(a.createdOn).getTime() < new Date(b.createdOn).getTime()) {
        return 1;
      } else if (new Date(a.createdOn).getTime() > new Date(b.createdOn).getTime()) {
        return -1;
      } else {
        return 0;
      }
    });

    return tweets;
  }
  
}
