import { SmScholarshipAnnouncement } from '../models/sm-scholarship-announcement';
export class ApplicationTrackingForm{

    public smScholarshipAnnouncement: SmScholarshipAnnouncement;
    public status: string;
    public application_code: string;
    public collage_year: string;

    constructor(){
      this.smScholarshipAnnouncement = new SmScholarshipAnnouncement();
    }
}
