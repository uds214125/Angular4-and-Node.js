import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  // templateUrl: './footer.component.html',
  template:`<div class="row">
        {{year}}
  </div>`,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year="2017 @ UDS";
  constructor() { }

  ngOnInit() {
  }

}
