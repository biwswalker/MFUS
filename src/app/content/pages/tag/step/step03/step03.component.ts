import { StepComponent } from './../step.component';
import { StepService } from './../../../../../services/tag/step.service';
import { AcStudent } from './../../../../models/ac-student';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step03',
  templateUrl: './step03.component.html',
  styleUrls: ['./step03.component.css']
})
export class Step03Component implements OnInit {

  data: AcStudent = new AcStudent();

  constructor(private stepService: StepService,private step: StepComponent) { }

  ngOnInit() {
    this.data = this.stepService.getData();
    console.log('data = ' + this.data);
  }

  next() {
    console.log('data = ' + this.data);
    console.log('data' + this.data);
    this.stepService.addData(this.data);
    this.step.onNext();
  }

}
