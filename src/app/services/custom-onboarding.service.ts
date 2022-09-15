import {
  AfterViewInit,
  Injectable,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomOnboardingService implements OnChanges {
  startTour: boolean = false;

  private _position: DOMRect = new DOMRect();

  get position(): DOMRect {
    return this._position;
  }

  set position(value: DOMRect) {
    this._position = value;
  }

  private _stepName: string = 'firstStep';

  get stepName(): string {
    return this._stepName;
  }

  set stepName(value: string) {
    this._stepName = value;
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    /* if (
      changes['name'].currentValue === this.customOnboardingService.stepName
    ) {
      this.customOnboardingService.position =
        this.htmlElement.nativeElement.getBoundingClientRect();
    } */
  }

  // Create a subject - The thing that will be watched by the observable
  public nextStep = new Subject<string>();

  // Create an observable to watch the subject and send out a stream of updates (You will subscribe to this to get the update stream)
  public nextStep$ = this.nextStep.asObservable(); //Has a $

  /* // ------ Getting Your updates ----------
   // Subscribe to the observable you created.. data will be updated each time there is a change to Subject
   public nextStepSubscription = this.nextStep$.subscribe((nextStep) => {
     (this.onChangeStep[nextStep]() as Promise<boolean>)
       .then((ok) => {
         if (ok) {
           if (nextStep === 0) return;
           this.showError = false;
           this.next();
         }
       })
       .catch((error) => console.log(error));
   });

   // ------ How to update the subject ---------
   // Create a method that allows you to update the subject being watched by observable
   public updateStringSubject(newNextStep: number) {
     this.nextStep.next(newNextStep);
   } */
}
