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
    const formattedList = this.formatList(this.list);
  }

  formatList(list) {
    for (const key of Object.keys(list)){
      this.formattedList.push(key);
    }
    console.log(this.formattedList);
    return this.formattedList;

  }
  counter(i: number) {
    return new Array(i);
  }

}
