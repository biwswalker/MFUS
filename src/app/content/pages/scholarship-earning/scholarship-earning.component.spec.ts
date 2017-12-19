import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipEarningComponent } from './scholarship-earning.component';

describe('ScholarshipEarningComponent', () => {
  let component: ScholarshipEarningComponent;
  let fixture: ComponentFixture<ScholarshipEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarshipEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
