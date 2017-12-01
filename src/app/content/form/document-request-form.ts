import { SmDocumentRequest } from '../models/sm-document-request';
import { SmDocumentRequestDetail } from '../models/sm-document-request-detail';
import { ApApplication } from '../models/ap-application';
import { SmScholarshipAnnouncement } from '../models/sm-scholarship-announcement';
import { SmScholarship } from '../models/sm-scholarship';
export class DocumentRequestForm {

  public smDocumentRequest: SmDocumentRequest;
  public apApplication: ApApplication;
  public smScholarshipAnnoucement: SmScholarshipAnnouncement;
  public smScholarship: SmScholarship;
  public smDocumentRequestDetail : SmDocumentRequestDetail[];
  public sortField: string;

  constructor() {
    this.smDocumentRequest = new SmDocumentRequest();
    this.smDocumentRequestDetail = [];
    this.sortField = "";
  }

}