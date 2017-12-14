import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { DocumentRequestForm } from '../content/form/document-request-form';
import { DocumentUploadForm } from '../content/form/document-upload-form';
import { config } from './../app.config';

@Injectable()
export class DocumentrequestService {
  private mainUrl: string = config.backendUrl;
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
        let results: DocumentRequestForm[] = [];
        let form: DocumentRequestForm = new DocumentRequestForm();
        for(let data of res.json()){          
          form = new DocumentRequestForm();
          form.applicationCode = data.application_code;
          form.scholarshipName = data.scholarship_name;
          form.smDocumentRequest = data.sm_document_request;
          form.smDocumentRequestDetail = data.details;
          if(form.smDocumentRequestDetail!=null){
            form.requestDoc =  form.smDocumentRequestDetail.length;
          }else{
            form.requestDoc =  0;
          }
          
          console.log("requestDoc:"+form.requestDoc);
          results.push(form);
        }
      
        return results;
      }
    );
  }

  addDocumentRequest(documentUpload: DocumentRequestForm){
    const url = this.mainUrl + "document-upload-extra";
    const body = JSON.stringify(documentUpload);
    console.log("url: "+url);
    console.log("body: "+ body);
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(url, body,{headers: headers});
  }

}
