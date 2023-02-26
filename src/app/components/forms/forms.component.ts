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

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const storedTime = localStorage.getItem('lastClickTime');
        const storedDuration = localStorage.getItem('countdownDuration');
        if (storedTime && storedDuration) {
          this.lastClickTime = parseInt(storedTime);
          const remainingSeconds = Math.round(parseInt(storedDuration) - (new Date().getTime() - this.lastClickTime) / 1000);
          if (remainingSeconds > 0) {
            this.startCountdownTimer(remainingSeconds);
          }
        }
      }
    });
  }

  type=0
  onClicks(n:any){
    this.type=n
  }

  onClick() {
    const currentTime = new Date().getTime();
    const elapsedSeconds = (currentTime - this.lastClickTime) / 1000;
    this.type=1;
    if (elapsedSeconds < this.countdownTime) {
      const remainingSeconds = Math.round(this.countdownTime - elapsedSeconds);
      this.startCountdownTimer(remainingSeconds);
      return;
    }

    this.isDisabled = true;
    this.lastClickTime = currentTime;
    localStorage.setItem('lastClickTime', this.lastClickTime.toString());
    
    // perform button click action here
    console.log('Button clicked');
    
    this.startCountdownTimer(this.countdownTime);
  }

  private startCountdownTimer(duration: number) {
    clearInterval(this.countdownIntervalId!);
    this.countdownIntervalId = setInterval(() => {
      duration--;
      this.updateButtonText(duration);
      localStorage.setItem('countdownDuration', (duration + 1).toString());
      
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
    localStorage.removeItem('lastClickTime');
    localStorage.removeItem('countdownDuration');
    this.isDisabled = false;
    this.renderer.setProperty(this.buttonRef.nativeElement, 'innerText', 'Click me');
  }
}
