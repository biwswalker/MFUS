import { SmDocumentRequest } from '../models/sm-document-request';
import { SmDocumentRequestDetail } from '../models/sm-document-request-detail';
import { ApApplication } from '../models/ap-application';
import { SmScholarshipAnnouncement } from '../models/sm-scholarship-announcement';
import { SmScholarship } from '../models/sm-scholarship';
import { RftApplicationDocument } from '../models/rft-application-document';
export class ApplicationDocumentForm {

  public rftApplicationDocument: RftApplicationDocument;

  constructor() {
    this.rftApplicationDocument = new RftApplicationDocument();
  }

}