import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ApplicationDocumentForm } from '../content/form/application-document-form';
import { config } from './../app.config';

@Injectable()
export class ApplicationDocumentService {
  private mainUrl: string = config.backendUrl;
  private pageUrl: string = 'application-document';
  constructor(private http: Http) { }

  addApplicationDocument(applicationDocument: ApplicationDocumentForm){
    console.log("addApplicationDocument.....");
    const url = this.mainUrl + this.pageUrl;
    const body = JSON.stringify(applicationDocument);
    console.log("url: "+url);
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, body, {headers: headers});
  }

  searchApplicationDocument(applicationDocument: ApplicationDocumentForm):Observable<ApplicationDocumentForm[]>{
    const url = this.mainUrl + this.pageUrl;
    const headers = new Headers({'Content-Type':'application/json'});
    const body = JSON.stringify(applicationDocument);
    let criteria = '/';

    return this.http.get(url + criteria, { headers: headers })
    .map(
    (res: Response) => {
        let results: ApplicationDocumentForm[] = [];
        let form: ApplicationDocumentForm = new ApplicationDocumentForm();
        for (let data of res.json()) {
            form = new ApplicationDocumentForm();
            form.rftApplicationDocument = data;
            results.push(form);
        }
        return results;
    }
    );
}


getMax():Observable<string>{
    const maxurl = "max-appdoccode";
    const url = this.mainUrl + maxurl;
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.get(url, { headers: headers })
    .map(
    (res: Response) => {    
        return res.json().result;
    }
    );
 }

}
