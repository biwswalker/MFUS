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

    addApplicationDocument(applicationDocument: ApplicationDocumentForm) {
        const url = this.mainUrl + this.pageUrl;

        const body = JSON.stringify(applicationDocument.rftApplicationDocument);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(url, body, { headers: headers });
    }

    searchApplicationDocument(applicationDocument: ApplicationDocumentForm): Observable<ApplicationDocumentForm[]> {
        const url = this.mainUrl + this.pageUrl;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(applicationDocument);
        let criteria = '/';
        if (applicationDocument.rftApplicationDocument.document_code != null &&
            applicationDocument.rftApplicationDocument.document_code != '') {
            criteria +=  'document_code=' + applicationDocument.rftApplicationDocument.document_code + '&';
        }
        if (applicationDocument.rftApplicationDocument.document_name != null &&
            applicationDocument.rftApplicationDocument.document_name != '') {
            criteria +=  'document_name=' + applicationDocument.rftApplicationDocument.document_name + '&';
        }
        if (applicationDocument.rftApplicationDocument.pdf_name != null &&
            applicationDocument.rftApplicationDocument.pdf_name != '') {
            criteria +=  'pdf_name=' + applicationDocument.rftApplicationDocument.pdf_name + '&';
        }

        let fullUrl = url + criteria;
        return this.http.get(fullUrl, { headers: headers })
            .map(
            (res: Response) => {
                let results: ApplicationDocumentForm[] = [];
                let form: ApplicationDocumentForm = new ApplicationDocumentForm();
                for (let data of res.json()) {
                    form = new ApplicationDocumentForm();
                    form.rftApplicationDocument = data;
                    console.log(form.rftApplicationDocument.pdf_name);
                    results.push(form);
                }
                return results;
            }
            );
    }


    getMax(): Observable<string> {
        const maxurl = "max-appdoccode";
        const url = this.mainUrl + maxurl;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(url, { headers: headers })
            .map(
            (res: Response) => {
                return res.json().result;
            }
            );
    }

    update(form: ApplicationDocumentForm, ref: string){
        const url = this.mainUrl + this.pageUrl + '/' + ref;
        console.log(url);
        const body = JSON.stringify(form);
        console.log(body);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.put(url, body , {headers: headers});
    }

}
