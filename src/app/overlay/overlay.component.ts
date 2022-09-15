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

  get position(): DOMRect {
    return this.customOnboardingService.position;
  }

  constructor(private customOnboardingService: CustomOnboardingService) {}

  ngAfterViewInit(): void {
    console.log(this.customOnboardingService.position.width);
    let div = document.querySelector('.modal-content') as HTMLElement;
    div.style.width = this.position.width + 'px';
    setTimeout(() => {
      console.log('timeout', this.customOnboardingService.position);
    }, 1000);
  }

  ngOnInit(): void {}

  onClose() {
    this.close.emit(true);
  }
}
