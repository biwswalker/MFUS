import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlenameComponent } from './titlename.component';

describe('TitlenameComponent', () => {
  let component: TitlenameComponent;
  let fixture: ComponentFixture<TitlenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitlenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
