import { Controller, Get } from '@nestjs/common';
import { TwitterService } from 'src/twitter/twitter.service';

@Controller('profiles')
export class ProfilesController {

    constructor(private twitterService: TwitterService) {

    }

    @Get()
    getProfiles() {
        return this.twitterService.getProfiles();
    }
    

}
