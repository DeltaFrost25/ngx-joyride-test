import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, takeUntil } from 'rxjs';
import { CustomOnboardingService } from 'src/app/services/custom-onboarding.service';

@Directive({
  selector: '[appOnboarding]',
})
export class OnboardingDirective implements OnInit, AfterViewInit {
  htmlElement: ElementRef<HTMLElement>;
  prevZindex: string = '';
  _name: string = '';

  @Input('appOnboarding') set name(value: string) {
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  get stepName(): string {
    return this.customOnboardingService.stepName;
  }

  constructor(
    private el: ElementRef<HTMLElement>,
    private customOnboardingService: CustomOnboardingService
  ) {
    this.htmlElement = el;
    this.customOnboardingService.checkScroll.next(true);
  }

  firstOnboard = false;
  ngAfterViewInit(): void {
    let zIndex = this.el.nativeElement.style.zIndex;
    fromEvent(window, 'resize').subscribe(() => {
      if (
        this.customOnboardingService.startTour &&
        this.customOnboardingService.currentStep === this.name
      ) {
        this.customOnboardingService.position.next({
          height: this.el.nativeElement.offsetHeight,
          left: this.getOffset(this.el.nativeElement).left,
          top: this.getOffset(this.el.nativeElement).top,
          width: this.el.nativeElement.offsetWidth,
        });
      }
    });
    this.customOnboardingService.nextStep$.subscribe((next) => {
      if (this.name === next) {
        /* offsetTop - window.scrollY */
        this.customOnboardingService.currentStep = next;
        this.customOnboardingService.position.next({
          height: this.el.nativeElement.offsetHeight,
          left: this.getOffset(this.el.nativeElement).left,
          top: this.getOffset(this.el.nativeElement).top,
          width: this.el.nativeElement.offsetWidth,
        });

        if (zIndex) this.prevZindex = zIndex;

        setTimeout(() => {
          this.el.nativeElement.style.position = 'relative';
          this.el.nativeElement.style.zIndex = '1005';
          window.scroll(0, this.getOffset(this.el.nativeElement).top);
          this.firstOnboard = true;
        }, 10);
        this.el.nativeElement.scrollIntoView();
      } else {
        this.el.nativeElement.style.zIndex = zIndex;
      }
    });
  }

  ngOnInit() {}

  getOffset(el: any) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }
}
