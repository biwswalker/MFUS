import { MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'จัดการทุนการศึกษา',
        items: [
          { label: 'บันทึกผู้ให้ทุนการศึกษา', routerLink: ['/pages/sponsors'] },
          { label: 'บันทึกทุนการศึกษา', routerLink: ['/pages/scholarships'] },
          { label: 'บันทึกประกาศทุนการศึกษา' }
        ]
      }, {
        label: 'การจัดการ',
        items: [
          { label: 'คัดกรองเอกสาร' },
          { label: 'ข้อมูลผู้มีสิทธิ์สัมภาษณ์' },
          { label: 'ข้อมูลผู้ได้รับทุนการศึกษา' }
        ]
      }
    ];
  }

}
