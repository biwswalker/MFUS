import { SmSponsors } from './../models/sm-sponsors';
import { SmScholarship } from './../models/sm-scholarship';
export class ScholarshipForm {

  public smScholarship: SmScholarship;
  public smSponsors: SmSponsors;
  public index: number;

  public sortField: string;

  constructor() {

    this.smScholarship = new SmScholarship();
    this.smSponsors = new SmSponsors();

  }
}
