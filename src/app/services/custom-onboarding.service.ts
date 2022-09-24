import { NumberSymbol } from '@angular/common';
import {
  AfterViewInit,
  Injectable,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { of, Subject } from 'rxjs';

interface Position {
  width: number;
  height: number;
  left: number;
  top: number;
}
@Injectable({
  providedIn: 'root',
})
export class CustomOnboardingService implements OnChanges {
  private _startTour: boolean = false;

  get startTour(): boolean {
    return this._startTour;
  }

  set startTour(value: boolean) {
    this._startTour = value;
  }

  private _position2: Position = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  };

  get position2(): Position {
    return this._position2;
  }

  set position2(value: Position) {
    this._position2 = value;
  }

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

  public checkScroll = new Subject<boolean>();
  public checkScroll$ = this.checkScroll.asObservable();
  /* Here's how you can make it a object and use it for multiple values

export class DataService {

    private cartObject = new BehaviorSubject<Object>({});
    cartObjectInfo = this.cartObject.asObservable();

    constructor() { }

    changeCart(cartObject) {
        this.cartObject.next(cartObject);
    }
}
First is get the value in BehaviourSubject

this.data.cartObjectInfo.subscribe(cartObject => {
   if(cartObject) this.cartObject = cartObject;
});
this.data.changeCart({//make the full object here}); */

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
