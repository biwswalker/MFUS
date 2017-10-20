import { SmSponsors } from './../models/sm-sponsors';
import { RftSubDistrict } from './../models/rft-sub-district';
import { RftDistrict } from './../models/rft-district';
import { RftProvince } from './../models/rft-province';

export class SponsorsForm {

  index :number;
  public smSponsors: SmSponsors;
  public rftProvince: RftProvince;
  public rftDistrict: RftDistrict;
  public rftSubDistrict: RftSubDistrict;

  constructor() {
    this.smSponsors = new SmSponsors();
    this.rftProvince = new RftProvince();
    this.rftDistrict = new RftDistrict();
    this.rftSubDistrict = new RftSubDistrict();

  }
}
