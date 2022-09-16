import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    const ngx_holder = document.querySelectorAll('.joyride-step__holder');

    ngx_holder.forEach((holder: any) => {
      holder.style.backgroundColor = 'purple';
      holder.style.width = '300px';
    });
  }
  ngOnInit(): void {}
}
