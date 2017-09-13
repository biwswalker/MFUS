import { StepService } from './../../../../services/tag/step.service';
import { AcStudent } from './../../../models/ac-student';
import { MenuItem, Message } from 'primeng/primeng';
import { Component, OnInit,  ComponentFactoryResolver ,ViewContainerRef } from '@angular/core';


var page: string;

@Component({
  selector: 'app-step',
  templateUrl:  './step.component.html' ,
  styleUrls: ['./step.component.css']
})

export class StepComponent implements OnInit {

  items: MenuItem[];
  activeIndex: number = 0;
  msgs: Message[] = [];
  data: AcStudent = new AcStudent();

  constructor(private stepService: StepService,private resolver:ComponentFactoryResolver,
    private viewContainerRef:ViewContainerRef) { }

  onNext() {
    this.stepService.nextIndex();
    this.activeIndex = this.stepService.getIndex();
    this.data = this.stepService.getData();
    console.log('activeIndex = ' + this.activeIndex);
    console.log('data = ' + this.data);
  }

  ngOnInit() {
  //  page = './step.component.html';

    this.items = [{
      label: 'Personal',
      command: (event: any) => {
          this.activeIndex = 0;
          this.msgs.length = 0;
          this.msgs.push({severity:'info', summary:'First Step', detail: event.item.label});
      }
    },
    {
        label: 'Seat',
        command: (event: any) => {
            this.activeIndex = 1;
            this.msgs.length = 0;
            this.msgs.push({severity:'info', summary:'Seat Selection', detail: event.item.label});
        }
    },
    {
        label: 'Payment',
        command: (event: any) => {
            this.activeIndex = 2;
            this.msgs.length = 0;
            this.msgs.push({severity:'info', summary:'Pay with CC', detail: event.item.label});
        }
    },
    {
        label: 'Confirmation',
        command: (event: any) => {
            this.activeIndex = 3;
            this.msgs.length = 0;
            this.msgs.push({severity:'info', summary:'Last Step', detail: event.item.label});
        }
    }
  ];
  }

}
