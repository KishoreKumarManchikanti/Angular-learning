import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsFeedModule } from './news-feed/news-feed.module';

@Module({
  imports: [NewsFeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
