import { ApDocumentUpload } from '../models/ap-document-upload';
export class DocumentUploadForm {

    public apDocumentUpload: ApDocumentUpload;

    constructor(){
        console.log("ApDocumentUpload.constructor....");
        this.apDocumentUpload = new ApDocumentUpload();
    }
}