import { RftDistrict } from './../content/models/rft-district';
import { RftProvince } from './../content/models/rft-province';
import { Observable } from 'rxjs';
import { config } from './../app.config';
import { Injectable } from "@angular/core";
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { ConfigurationsService } from './configurations.service';

const url: string = config.backendUrl;

@Injectable()
export class StartupService {

  public provinceList: RftProvince[] = [];

  constructor(private configuration: ConfigurationsService) { }

  loadProvinces(): Promise<RftProvince[]> {
    return this.configuration.serviceMethodGet('province').toPromise().then((data: any) => this.provinceList = data)
  }
}
