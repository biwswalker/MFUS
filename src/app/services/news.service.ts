import { NewsComponent } from './../content/pages/news/news.component';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { NewsForm } from '../content/form/news-form';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Injectable()
export class NewsService {
  private mainUrl = 'http://127.0.0.1:8000/';
  private getStatus: NewsComponent;
    constructor(private http: Http) { }

    addNews(news: NewsForm) {
      console.log('service.news : ', news);
      const url = this.mainUrl + 'news';
      const body = JSON.stringify(news);
      const headers = new Headers({'Content-Type': 'application/json'});

      console.log(body);
      return this.http.post(url, body, { headers: headers });
    }

    searchNews(news: NewsForm): Observable<NewsForm[]> {
      const url = this.mainUrl + 'news';
      const body = JSON.stringify(news);
      const headers = new Headers({'Content-Type': 'application/json'});
      console.log('body: ', body);
      let criteria = '/';

      if(news.smNews.news_topic != null
          && news.smNews.news_topic != '') {
        criteria = criteria + 'news_topic=' + news.smNews.news_topic + '&';
      }

      if(news.startDate != null &&
        news.startDate !='') {
          news.startDate = moment(news.startDate).format('YYYY-MM-DD');
        criteria = criteria + 'startDate=' + news.startDate + '&';
      }

      if(news.endDate != null &&
        news.endDate != '') {
          news.endDate = moment(news.endDate).format('YYYY-MM-DD');
        criteria = criteria + 'endDate=' + news.endDate + '&';
      }

      if(news.smNews.active_flag !=null
        && news.smNews.active_flag != '') {
        criteria = criteria + 'active_flag=' + news.smNews.active_flag + '&'
      }

      console.log('criteria :', criteria);
      if(criteria.length > 1){
        criteria = criteria.substr(0,criteria.length-1);
      }else{
        criteria = '';
      }
      console.log(body);
      console.log(criteria);

      return this.http.get(url+criteria, {headers: headers})
      .map(
        (res: Response) => {
          let results: NewsForm[] = [];
          let form: NewsForm = new NewsForm();
          console.log('res.json() = ', res.json());
          for (let data of res.json()) {
            console.log('==================');
            console.log('data.news_topic = ' + data.news_topic);
            console.log('data.publish_date = ' + data.publish_date);
            console.log('data.active_flag = ' + data.active_flag);
            console.log('data.news_detail = ' + data.news_detail);
            form = new NewsForm();
            form.smNews = data;
            form.smNews.news_topic = data.news_topic;
            form.smNews.publish_date = data.publish_date;
            form.smNews.news_detail = data.news_detail;

            if(form.smNews.active_flag == "Y") {
              form.smNews.active_flag = 'ใช้งาน';
            } else {
              form.smNews.active_flag = 'ไม่ใช้งาน';
            }
            console.log('form.smNews.news_topic = ' + form.smNews.news_topic);
            results.push(form);
          }
          return results;
        }
      );
    }



    updateNews(form: NewsForm, ref: string) {
      console.log('ref : ' + ref);
      const url = this.mainUrl + 'news/' + ref;
      const body = JSON.stringify(form);
      const headers = new Headers({'Content-Type': 'application/json'});
      console.log('body: ', body);
      return this.http.put(url, body, {headers: headers});
    }

    deleteNews(news: string) {
      console.log('service.news : ', news);
      const url = this.mainUrl + 'news/' + news;
      // const body = JSON.stringify(news);
      const headers = new Headers({'Content-Type': 'application/json'});

      // console.log(url+body);
      return this.http.delete(url, { headers: headers });
    }
}
