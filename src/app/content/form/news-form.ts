import {SmNews} from '../models/sm-news';
export class NewsForm {
  public smNews: SmNews;
  startDate: string;
  endDate: string;
  constructor() {
    this.smNews = new SmNews();
  }
}
