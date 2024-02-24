import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

  testimonialConfig = {
    "slidesToShow": 3,
    "centerMode": true,
    "slidesToScroll": 1,
    "autoplay": true,
    "pauseOnHover": false
  }
  testimonials: any = [
    {},
    {},
    {},
    {},
    {},
    {}
  ]
}
