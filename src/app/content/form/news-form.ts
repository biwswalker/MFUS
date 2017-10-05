import {SmNews} from '../models/sm-news';
export class NewsForm {
  public smNews: SmNews;

  constructor() {
    this.smNews = new SmNews();
  }
}
