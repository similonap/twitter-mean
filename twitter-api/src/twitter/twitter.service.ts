import { HttpException, HttpStatus, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Tweet, Profile } from 'src/types';
import * as twitterJson from "../twitter.json"; 
import { MongoClient } from "mongodb";

const uri = "mongodb://twitter:twitter@localhost:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true";

@Injectable()
export class TwitterService {
    private client = new MongoClient(uri);
    constructor() {
        this.loadDataFromDb();
    }

    onModuleInit() {
        this.client.connect();
    }

    onModuleDestroy() {
        this.client.close();
    }

    private async loadDataFromDb() {
        let tweets = await this.client.db("WebFrameworks").collection("Tweets").find<Tweet>({}).toArray();
        if (tweets.length === 0) {
            console.log(twitterJson);
            let tweets = twitterJson.tweets;
            let profiles = twitterJson.profiles;

            await this.client.db("Twitter").collection("Tweets").insertMany(tweets);
            await this.client.db("Twitter").collection("Profiles").insertMany(profiles);
        }
    }

    async getTweets() {
        let tweets = await this.client.db("Twitter").collection("Tweets").find<Tweet>({}).toArray();
        return tweets;
    }

    async getProfiles() {
        let profiles = await this.client.db("Twitter").collection("Profiles").find<Profile>({}).toArray();
        return profiles;
    }

    async createTweet(tweet: Tweet) {
        let tweets = await this.getTweets();
        tweet.id = Math.max(...tweets.map(t => t.id)) + 1;
        tweet.createdOn = new Date().toISOString();
        await this.client.db("Twitter").collection("Tweets").insertOne(tweet);
        return tweet;
    }
}
