import { UtilsService } from '../../../../services/utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '../../pages.component.css']
})
export class CalendarComponent implements OnInit {

  dateOfBirth: Date;
  dateStringDb: string;
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    console.log('displayStringDate ' + this.utilsService.displayStringDate(new Date()));
    console.log('displayDateToString ' + this.utilsService.displayDateToString('1', '9', '2017'));
    console.log('convertStringToDate ' + this.utilsService.convertStringToDate('1', '9', '2017'));
    console.log('convertStringDbToDate ' + this.utilsService.convertStringDbToDate('30092017'));
  }

  onDateSelected(){
    this.dateStringDb = this.utilsService.convertDateToDb(this.dateOfBirth);
  }

}
