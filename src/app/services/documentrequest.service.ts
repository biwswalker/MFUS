import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { DocumentRequestForm } from '../content/form/document-request-form';

@Injectable()
export class DocumentrequestService {
  private mainUrl: string = 'http://127.0.0.1:8000/';
  constructor(private http:Http) { }

  searchDocumentRequest(documentRequest: DocumentRequestForm):Observable<DocumentRequestForm[]>{
    const url = this.mainUrl + 'document-request';
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(documentRequest);
    let criteria = '/';
    let sort = '|';
    if(documentRequest.smDocumentRequest.reply_flag != null &&
    documentRequest.smDocumentRequest.reply_flag != ''){
      criteria = criteria + 'reply_flag=' + documentRequest.smDocumentRequest.reply_flag;
    }

    //sort field
    if(documentRequest.sortField != null){
      sort = sort + documentRequest.sortField;
    }
    console.log("url: " + url + criteria + sort);
    let fullUrl = url + criteria + sort;
    return this.http.get(fullUrl, {headers: headers}).map(
      (res: Response) => {
        console.log(res);
        let results: DocumentRequestForm[] = [];
        let form: DocumentRequestForm = new DocumentRequestForm();
        for(let data of res.json()){
          form = new DocumentRequestForm();
          console.log(data);
          form.smDocumentRequest = data.sm_document_request;
          form.apApplication = data.ap_application;
          form.smScholarshipAnnoucement = data.sm_scholarship_annoucement;
          form.smScholarship = data.sm_scholarship;
          form.smDocumentRequestDetail = data.sm_document_request_detail;
          results.push(form);
        }
      
        return results;
      }
    );
  }

}
