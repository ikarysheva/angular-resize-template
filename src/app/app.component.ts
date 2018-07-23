import { Component, OnInit } from '@angular/core';
import { ResizeService } from './resize/resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private resizeService: ResizeService) { }

  ngOnInit() {
    console.log(this.resizeService);
  }
}
