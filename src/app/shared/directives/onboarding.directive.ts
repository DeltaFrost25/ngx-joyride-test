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
        this.customOnboardingService.position =
          this.el.nativeElement.getBoundingClientRect();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
