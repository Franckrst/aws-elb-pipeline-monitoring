import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ELBComponent } from './elb.component';

describe('ELBComponent', () => {
  let component: ELBComponent;
  let fixture: ComponentFixture<ELBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ELBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ELBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
