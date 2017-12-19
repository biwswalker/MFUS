import { ApApplication } from "../models/ap-application";

export class ApplicationForm {

public apApplicaiton: ApApplication
public year:number;
start_date: Date;
end_date: Date;
announce_ref: string;
  constructor() {
      this.apApplicaiton = new ApApplication();
  }

}