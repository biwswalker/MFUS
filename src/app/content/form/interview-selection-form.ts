
export class InterviewSelectionForm {

  interviewSelection :any; //collect data display in datatable.
  year: number;
  announce_ref: string;
  interview_start_date: Date;
  interview_end_date: Date;

  constructor() {
    this.interviewSelection = null;
    this.year = null;
    this.announce_ref = null;
    this.interview_start_date = null;
    this.interview_end_date = null;
  }
}
