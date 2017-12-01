import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { RftTitleName } from './../content/models/rft-title-name';
import { TitleNameForm } from './../content/form/titlename-form';
import { Injectable } from '@angular/core';
import { config } from './../app.config';


@Injectable()
export class TitleNameService {
    private mainUrl: string =  config.backendUrl;
    constructor(private http: Http) { }

    getTitleNames(): Observable<RftTitleName[]> {
        const url = this.mainUrl + 'titlename';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .map(
            (res: Response) => {
                return res.json();
            }
            );
    }

    addTitle(title: TitleNameForm) {
        console.log("addTitle");
        const url = this.mainUrl + 'titlename';
        const body = JSON.stringify(title);
        console.log("url: "+url);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(url, body, { headers: headers });
    }

    searchTitlename(titlename: TitleNameForm): Observable<TitleNameForm[]> {
        const url = this.mainUrl + 'titlename';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(titlename);
        let criteria = '/';
        if (titlename.rftTitleName.title_code != null &&
            titlename.rftTitleName.title_code != '') {
            criteria = criteria + 'title_code=' + titlename.rftTitleName.title_code + '&';
        }
        if (titlename.rftTitleName.title_name_t != null &&
            titlename.rftTitleName.title_name_t != '') {
            criteria = criteria + 'title_name_t=' + titlename.rftTitleName.title_name_t + '&';
        }
        if (titlename.rftTitleName.title_name_e != null &&
            titlename.rftTitleName.title_name_e != '') {
            criteria = criteria + 'title_name_e=' + titlename.rftTitleName.title_name_e + '&';
        }
        console.log(titlename.rftTitleName.gender);
        if (titlename.rftTitleName.gender != null &&
            titlename.rftTitleName.gender != '') {
            criteria = criteria + 'gender=' + titlename.rftTitleName.gender + '&';
        }
        if (criteria.length > 1) {
            criteria = criteria.substr(0, criteria.length - 1);
        } else {
            criteria = '';
        }

        return this.http.get(url + criteria, { headers: headers })
            .map(
            (res: Response) => {
                let results: TitleNameForm[] = [];
                let form: TitleNameForm = new TitleNameForm();
                for (let data of res.json()) {
                    form = new TitleNameForm();
                    form.rftTitleName = data;
                    results.push(form);
                }
                return results;
            }
            );
    }

    updateTitle(title: TitleNameForm, ref: string) {
        const url = this.mainUrl + 'titlename/' + ref;
        const body = JSON.stringify(title);
        console.log(body);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(url, body, { headers: headers });
    }
}
