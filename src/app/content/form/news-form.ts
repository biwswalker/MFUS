import {SmNews} from '../models/sm-news';
export class NewsForm {
  public smNews: SmNews;
  startDate: any;
  endDate: any;
  constructor() {
    this.smNews = new SmNews();
  }
}
