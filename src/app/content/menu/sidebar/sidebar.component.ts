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
          { label: 'บันทึกทุนการศึกษา', routerLink: ['/pages/scholarship'] },
          { label: 'บันทึกประกาศทุนการศึกษา', routerLink: ['/pages/scholarship-announcement'] }
        ]
      }, {
        label: 'การจัดการ',
        items: [
          { label: 'คัดกรองเอกสาร' },
          { label: 'ข้อมูลผู้มีสิทธิ์สัมภาษณ์' },
          { label: 'ข้อมูลผู้ได้รับทุนการศึกษา' }
        ]
      },
      {
        label: 'ข้อมูลพื้นฐาน',
        items: [
          {
            label: 'ข้อมูลสำนักวิชา',
            routerLink: ['/pages/school']
          },
          {
            label: 'ข้อมูลสาขาวิชา',
            routerLink: ['/pages/major']
          }

        ]
      },
      {
        label: 'อื่นๆ',
        items: [
          {
            label: 'บันทึกข่าวสาร',
            routerLink: ['/pages/news']
          },
          {
            label: 'สมัครทุน',
            routerLink: ['/pages/apply-scholarship']
          }

        ]
      }
    ];
  }

}
