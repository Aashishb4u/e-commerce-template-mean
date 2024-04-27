import {Directive, ElementRef, Renderer2, OnInit, OnDestroy, Input} from '@angular/core';

@Directive({
  selector: '[appShowOnView]'
})
export class ShowOnViewDirective implements OnInit, OnDestroy {
  @Input() delay: number = 0; // Default delay set to 0

  private observer: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {

    // Create an instance of IntersectionObserver with a callback function
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // If the element is in the viewport, apply a delay
              setTimeout(() => {
                // Add the CSS class after the delay
                this.renderer.addClass(this.el.nativeElement, 'fade-in');
              }, this.delay);
            } else {
              // Element has exited the viewport
              // Remove the class immediately
              // this.renderer.removeClass(this.el.nativeElement, 'fade-in');
            }
          });
        },
        {
          threshold: 0.1 // Adjust this threshold as needed
        }
      );

      // Start observing the element
      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    // Clean up the observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
