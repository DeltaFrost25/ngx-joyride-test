import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingDirective } from './directives/onboarding.directive';

@NgModule({
  declarations: [OnboardingDirective],
  exports: [OnboardingDirective],
})
export class SharedModule {}
