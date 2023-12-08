import { Body, Controller, Get, Post } from '@nestjs/common';
import { TwitterService } from 'src/twitter/twitter.service';
import { Tweet } from 'src/types';

@Controller('tweets')
export class TweetsController {
    constructor(private twitterService: TwitterService) {

    }

    @Get()
    public async getTweets() {
        return await this.twitterService.getTweets();
    }

    @Post()
    public async createTweet(@Body() tweet: Tweet) {
        return await this.twitterService.createTweet(tweet);
    }
    
}
