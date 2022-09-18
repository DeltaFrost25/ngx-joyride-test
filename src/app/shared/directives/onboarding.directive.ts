import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CustomOnboardingService } from 'src/app/services/custom-onboarding.service';

@Directive({
  selector: '[appOnboarding]',
})
export class OnboardingDirective implements OnInit, AfterViewInit, OnChanges {
  htmlElement: ElementRef<HTMLElement>;

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
  }
  ngAfterViewInit(): void {}

  ngOnInit() {
    this.customOnboardingService.nextStep$.subscribe((next) => {
      if (this.name === next) {
        /* offsetTop - window.scrollY */
        this.customOnboardingService.position =
          this.el.nativeElement.getBoundingClientRect();
        this.customOnboardingService.position2.height =
          this.el.nativeElement.offsetHeight;
        this.customOnboardingService.position2.width =
          this.el.nativeElement.offsetWidth;
        this.customOnboardingService.position2.left = this.getOffset(
          this.el.nativeElement
        ).left;
        this.customOnboardingService.position2.top = this.getOffset(
          this.el.nativeElement
        ).top;
        setTimeout(() => {
          this.el.nativeElement.scrollIntoView();
        }, 0.5);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
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
  /* var x = getOffset( document.getElementById('yourElId') ).left;  */
}
