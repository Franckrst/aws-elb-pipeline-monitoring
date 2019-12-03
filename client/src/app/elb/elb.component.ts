import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-elb',
  templateUrl: './elb.component.html',
  styleUrls: ['./elb.component.css']
})
export class ELBComponent implements OnInit {

  @Input() elb;
  constructor() { }

  ngOnInit() {
  }

}
