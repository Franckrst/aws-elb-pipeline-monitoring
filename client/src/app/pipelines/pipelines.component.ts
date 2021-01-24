import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.css']
})
export class PipelinesComponent implements OnInit {

  @Input() pipelines;
  constructor() { }

  ngOnInit() {
  }

}
