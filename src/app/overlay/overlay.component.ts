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

  truePosition: {
    display: string;
    width: string;
    height: string;
    left: string;
    top: string;
  } = {
    display: 'none',
    width: 0 + 'px',
    height: 0 + 'px',
    left: 0 + 'px',
    top: 0 + 'px',
  };
  get position(): {
    display: string;
    width: string;
    height: string;
    left: string;
    top: string;
  } {
    return {
      display: 'none',
      width: 0 + 'px',
      height: 0 + 'px',
      left: 0 + 'px',
      top: 0 + 'px',
    };
  }

  get start(): boolean {
    return this.customOnboardingService.startTour;
  }

  constructor(private customOnboardingService: CustomOnboardingService) {}

  ngAfterViewInit(): void {
    this.customOnboardingService.position$.subscribe((value) => {
      this.truePosition = {
        display: this.start ? 'block' : 'none',
        height: value.height + 'px',
        width: value.width + 'px',
        left: value.left + 'px',
        top: value.top + 'px',
      };
    });
  }

  ngOnInit(): void {}

  onClose() {
    this.close.emit(true);
  }
}
