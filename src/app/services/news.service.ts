import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { NewsForm } from '../content/form/news-form';

@Injectable()
export class NewsService {

    constructor(private http: Http) { }

    addNews(news: NewsForm) {
      console.log('service.news : ', news);
    }
}
