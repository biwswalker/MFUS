import { ConfigurationsService } from './configurations.service';
import { InterviewSelectionForm } from './../content/form/interview-selection-form';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../app.config';

@Injectable()
export class InterviewSelectionService {
  constructor(private configurationsService: ConfigurationsService) { }

  getInterviewSelectionList(form:InterviewSelectionForm){
      return this.configurationsService.serviceMethodPost('interview-selection-list', form);
    }
}
