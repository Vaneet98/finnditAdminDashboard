import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './forms.component.html'
})
export class FormsComponent {
  @ViewChild('buttonRef') buttonRef!: ElementRef<HTMLButtonElement>;
  
  public isDisabled = false;
  private lastClickTime = 0;
  private countdownIntervalId: ReturnType<typeof setInterval> | null = null;
  private countdownTime = 60;
  buttonText = 'Click me';

  constructor(private renderer: Renderer2) {
  }


  onClick() {
    const currentTime = new Date().getTime();
    const elapsedSeconds = (currentTime - this.lastClickTime) / 1000;
    
    if (elapsedSeconds < this.countdownTime) {
      const remainingSeconds = Math.round(this.countdownTime - elapsedSeconds);
      this.startCountdownTimer(remainingSeconds);
      return;
    }

    this.isDisabled = true;
    this.lastClickTime = currentTime;
    
    // perform button click action here
    console.log('Button clicked');
    
    this.startCountdownTimer(this.countdownTime);
  }

  private startCountdownTimer(duration: number) {
    clearInterval(this.countdownIntervalId!);
    this.countdownIntervalId = setInterval(() => {
      duration--;
      this.updateButtonText(duration);
      
      if (duration <= 0) {
        clearInterval(this.countdownIntervalId!);
        this.resetButton();
      }
    }, 1000) as ReturnType<typeof setInterval>;
  }

  private updateButtonText(duration: number) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const minutesString = ('0' + minutes).slice(-2);
    const secondsString = ('0' + seconds).slice(-2);
    const buttonText = `Click me after in ${minutesString}:${secondsString}`;
    
    this.renderer.setProperty(this.buttonRef.nativeElement, 'innerText', buttonText);
  }

  private resetButton() {
    this.isDisabled = false;
    this.renderer.setProperty(this.buttonRef.nativeElement, 'innerText', 'Click me');
  }
}
