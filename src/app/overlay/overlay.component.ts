import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CustomOnboardingService } from '../services/custom-onboarding.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent implements OnInit, AfterViewInit {
  @Input() openModal: boolean = true;
  @Input() title: string = '';
  @Input() paragraph: string = '';
  @Input() image: string = '';
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  get position(): {
    width: string;
    height: string;
    left: string;
    top: string;
  } {
    return {
      width: this.customOnboardingService.position.width + 'px',
      height: this.customOnboardingService.position.height + 'px',
      left: this.customOnboardingService.position.left + window.scrollX + 'px',
      top: this.customOnboardingService.position.top + window.scrollY + 'px',
    };
  }

  constructor(private customOnboardingService: CustomOnboardingService) {}

  ngAfterViewInit(): void {
    let div = document.querySelector('.modal-content') as HTMLElement;
    div.style.width = this.position.width + 'px';
    setTimeout(() => {
      console.log('set overlay');
      this.customOnboardingService.nextStep.next('firstStep');
      /* div.style.width = this.customOnboardingService.position.width + 'px'; */
      setTimeout(() => {
        console.log('set overlay');
        this.customOnboardingService.nextStep.next('secondStep');
        /* div.style.width = this.customOnboardingService.position.width + 'px'; */
      }, 3000);
    }, 3000);
  }
  /* ngAfterViewChecked(): void {
    /* Get the first value of Y background position
    this.getYBackgroundPosition();
    this.cdRef.detectChanges();
  } */

  ngOnInit(): void {}

  onClose() {
    this.close.emit(true);
  }

  /* function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
var x = getOffset( document.getElementById('yourElId') ).left; */
  /*
function getTop(el) {
  return el.offsetTop + (el.offsetParent && getTop(el.offsetParent));
} */
}
