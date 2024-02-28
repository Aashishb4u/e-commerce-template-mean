import { Component } from '@angular/core';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent {
  allServices = [
    {
      "service": "Prompt Delivery Services",
      "description": "Enjoy the convenience of prompt and reliable delivery services directly to your location. We prioritize timely delivery to ensure that your operations run seamlessly.",
      "icon": "fa fa-truck"
    },
    {
      "service": "Inventory Management",
      "description": "Tailored to your needs, we assist in maintaining customer-specific inventory levels. This ensures that you have the right products on hand to meet demand and maximize efficiency.",
      "icon": "fa fa-archive"
    },
    {
      "service": "Product Consultation",
      "description": "Our experienced team offers product consultation services, guiding you to choose the optimal products for your business. This ensures that your operations run efficiently and profitably.",
      "icon": "fa fa-cogs"
    },
    {
      "service": "Product Training",
      "description": "Invest in the knowledge and skills of your personnel. We provide product training to ensure that your team is well-versed in the usage and benefits of our products.",
      "icon": "fa fa-graduation-cap"
    },
    {
      "service": "Product Warehousing",
      "description": "Simplify your logistics with our product warehousing services. We provide secure storage facilities to streamline your supply chain and ensure product availability.",
      "icon": "fa fa-building"
    },
    {
      "service": "Equipment Surveys",
      "description": "Stay ahead with our equipment surveys, helping you assess the condition and performance of your equipment. Our insights enable you to make informed decisions for enhanced productivity.",
      "icon": "fa fa-search"
    }
  ];
}
