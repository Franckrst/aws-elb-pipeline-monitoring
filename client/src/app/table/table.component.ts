import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() headName: string;
  @Input() list;
  formattedList = [];

  constructor() { }

  ngOnInit() {
    this.formattedList = Object.keys(this.list);
  }

  counter(i: number) {
    return new Array(i).reverse();
  }

}
