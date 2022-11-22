import { animate, transition, trigger } from '@angular/animations';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import {
  JoyrideService,
  JoyrideStepService,
  StepActionType,
} from 'ngx-joyride';
import { JoyrideStepInfo } from 'ngx-joyride/lib/models/joyride-step-info.class';
import { Subject, Subscription } from 'rxjs';
import { CustomOnboardingService } from '../services/custom-onboarding.service';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.css'],
})
export class SectionTitleComponent implements OnInit, AfterViewInit {
  textContent: string = '';
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  showCalendar: boolean = true;
  hideCalendarStyle = {
    visibility: 'hidden',
    opacity: 0,
  };
  showCalendarStyle = {
    visibility: 'visible',
    opacity: 1,
  };
  selectedDate: Date = new Date();
  out: boolean = false;

  public subject: Subject<JoyrideStepInfo> = new Subject<JoyrideStepInfo>();

  /* public joyrideSubscription: Subscription = this.joyrideService.startTour(
    { steps: ['firstStep', 'secondStep'],
   }).subscribe(
    (step) => {
     console.log(step)
  },
   ) */
  /*   public joyrideSubscription: Subscription = this.joyrideService
    .startTour({ steps: ['firstStep', 'secondStep'] })
    .subscribe(
      (currentStep) => {
        console.log(currentStep);
        //const currentStepElement = document.querySelector(
        //  `[joyridestep='${currentStep.name}']`
        //);
        //if (!currentStepElement) {
        //  // skip this step
        //  this.joyrideStepService.next();
        //}
      },
      (error) => {
        console.log(error);
      },
      () => {
        // when joyride close
        console.log('finish');
      }
    ); */

  constructor(
    private readonly joyrideService: JoyrideService,
    private joyrideStepService: JoyrideStepService,
    private customOnboardingService: CustomOnboardingService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    /* this.joyrideService
      .startTour({ steps: ['firstStep', 'secondStep', 'thirdStep'] })
      .subscribe((step) => {
        this.customOnboardingService.startTour = true;
        this.customOnboardingService.nextStep.next(step.name);
      }); */
    /* this.nextWidth(); */
  }

  yearSelected(val: Event, type: string) {
    if (type === 'year') this.textContent = 'Año seleccionado';
    if (type === 'month') this.textContent = 'Mes seleccionado';
    if (type === 'day') this.textContent = 'Fecha seleccionada';
    /* this.joyrideStepService.next(); */
  }

  nextWidth() {
    setTimeout(() => {
      this.customOnboardingService.stepName = 'secondStep';
      console.log(
        this.customOnboardingService.stepName,
        this.customOnboardingService.position
      );
    }, 5000);
  }
}

/* service joyride */
/*
import { Injectable } from '@angular/core';
import { JoyrideService, JoyrideStepService } from 'ngx-joyride';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebGuideServiceCopy {

  // is joyride running
  isRunning$ = new BehaviorSubject<boolean>(false);

  get running() {
    return this.isRunning$.value;
  }

  constructor(
    private joyrideService: JoyrideService,
    private joyrideStepService: JoyrideStepService
  ) {}


   startTour(
    steps: string[],
    showCounter: boolean = false,
    startWith: string = steps[0]
  ): void {
    this.isRunning$.next(true);
    console.log('tours', steps);
    this.joyrideService
      .startTour({
        steps: steps,
        showCounter: showCounter,
        themeColor: '#003f9e',
        stepDefaultPosition: 'bottom',
        startWith: startWith,
      })
      .subscribe(
        (currentStep) => {
          const currentStepElement = document.querySelector(
            `[joyridestep='${currentStep.name}']`
          );

          if (!currentStepElement) {
            // skip this step
            this.joyrideStepService.next();
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // when joyride close
          this.isRunning$.next(false);
        }
      );
  }
}
*/
