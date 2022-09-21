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
export class OnboardingDirective implements OnInit, AfterViewInit, OnChanges {
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

        if (zIndex) this.prevZindex = zIndex;

        setTimeout(() => {
          this.el.nativeElement.style.position = 'relative';
          this.el.nativeElement.style.zIndex = '1005';
          window.scroll(0, this.getOffset(this.el.nativeElement).top);
          this.firstOnboard = true;
        }, 10);
        /* setTimeout(() => {
          this.el.nativeElement.style.position = 'relative';
          this.el.nativeElement.style.zIndex = '1005';
          this.el.nativeElement.scrollIntoView();
        });
        setTimeout(() => {
          this.el.nativeElement.style.position = 'relative';
          this.el.nativeElement.style.zIndex = '1005';
          this.el.nativeElement.scrollIntoView();
        }); */
        this.el.nativeElement.scrollIntoView();
      } else {
        this.el.nativeElement.style.zIndex = zIndex;
      }
    });
  }

  scroll = (event: any): void => {
    this.el.nativeElement.scrollIntoView();

    console.log(event);
    //handle your scroll here
    //notice the 'odd' function assignment to a class field
    //this is used to be able to remove the event listener
  };
  /*   timer: any;
  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const verticalOffset = window.pageYOffset;
    if (verticalOffset > this.getOffset(this.el.nativeElement).top) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      setTimeout(function () {
        this.el.nativeElement.scrollIntoView();
      }, 150);
    }
  } */

  /* destroy = new Subject();

            destroy$ = this.destroy.asObservable();

        constructor() {
            fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
                .subscribe((e: Event) => console.log(this.getYPosition(e)));
            }

            getYPosition(): number {
            return (e.target as Element).scrollTop;
            }

        ngOnDestroy(): void {
            this.destroy.next();
        } */

  ngOnInit() {}

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
