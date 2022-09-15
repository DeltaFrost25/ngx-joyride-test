import {
  AfterViewInit,
  Injectable,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

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
}
