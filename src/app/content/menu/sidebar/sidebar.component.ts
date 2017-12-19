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
        label: 'สมัครทุนการศึกษา',
        items: [
          { label: 'สมัครทุน', routerLink: ['/pages/sponsors'] },
          { label: 'ตรวจสอบสถานะการขอทุน', routerLink: ['/pages/scholarships'] },
          { label: 'บันทึกข้อมูลเอกสารเพิ่มเติม', routerLink: ['/pages/document-request'] }
        ]
      },
      {
        label: 'จัดการทุนการศึกษา',
        items: [
          { label: 'บันทึกผู้ให้ทุนการศึกษา', routerLink: ['/pages/sponsors'] },
          { label: 'บันทึกทุนการศึกษา', routerLink: ['/pages/scholarships'] },
          { label: 'บันทึกประกาศทุนการศึกษา', routerLink: ['/pages/scholarship-announcement'] }
        ]
      },
      {
        label: 'ตรวจสอบทุนการศึกษา',
        items: [
          {
            label: 'คัดกรองเอกสาร',
            routerLink: ['/pages/school']
          },
          {
            label: 'บันทึกผู้มีสิทธิ์สัมภาษณ์',
            routerLink: ['/pages/major']
          },
          {
            label: 'บันทึกข้อมูลผู้ที่ได้รับทุนการศึกษา',
            routerLink: ['/pages/scholarship-earning']
          }
        ]
      },
      {
        label: 'การจัดการ',
        items: [
          { label: 'คัดกรองเอกสาร', routerLink: ['/pages/documents-screening'] },
          { label: 'ข้อมูลผู้มีสิทธิ์สัมภาษณ์' },
          { label: 'ข้อมูลผู้ได้รับทุนการศึกษา' },
          { label: 'ข้อมูลเจ้าหน้าที่', routerLink: ['/pages/officer'] }
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
          },
          {
            label: 'ข้อมูลคำนำหน้าชื่อ',
            routerLink: ['/pages/titlename']
          },
          {
            label: 'ข้อมูลข้อมูลเอกสาร/หลักฐาน',
            routerLink: ['/pages/application-document']
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
