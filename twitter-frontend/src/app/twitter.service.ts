import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet,Profile } from '../types';
import twitterJson from '../twitter.json';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private httpClient: HttpClient) { }

  public getProfile(handle: string): Promise<Profile> { 
    return new Promise((resolve, reject) => {
      resolve(twitterJson.profiles.find(p => p.handle === handle)!);
    });
  }

  public getTweets(): Promise<Tweet[]> {
    let tweets : Tweet[] =  twitterJson.tweets;
    let profiles: Profile[] = twitterJson.profiles;
    for (let tweet of tweets) {
      tweet.profile = profiles.find(p => p.handle === tweet.handle);
    }
    tweets.sort((a, b) => { 
      if (new Date(a.createdOn).getTime() < new Date(b.createdOn).getTime()) {
        return 1;
      } else if (new Date(a.createdOn).getTime() > new Date(b.createdOn).getTime()) {
        return -1;
      } else {
        return 0;
      }
    });

    return new Promise((resolve, reject) => resolve(tweets));
  }
  
}
