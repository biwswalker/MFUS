import {StepsModule,MenuItem} from 'primeng/primeng';
import { Component, OnInit } from "@angular/core";
import { UtilsService } from '../../../services/utils.service';
import { Response } from "@angular/http";

@Component({
  selector: 'app-family-and-address',
  templateUrl: './family-and-address.component.html',
  styleUrls: ['./family-and-address.component.css', '../pages.component.css']
})
export class FamilyAndAddressComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;
  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'ข้อมูลครอบครัว',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'ข้อมูลพี่น้อง',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'ข้อมูลที่อยู่',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
    ];
  }

  onNext(index) {
    // this.applyscholarshipService.nextIndex(index);
    // this.activeIndex = this.applyscholarshipService.getIndex();
  // //  this.applyScholarshipForm = this.applyscholarshipService.getData();
      this.activeIndex = index;
      console.log('activeIndex = ' + this.activeIndex);
  //   console.log('data = ' + this.applyScholarshipForm);
  }

}
