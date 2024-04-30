import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  showOrders: any = false;
  currentPage: any = 1;
  orders: any = [
    {
      id: "#1234",
      date: "3 October 2024",
      status: "on Hold",
      price: "$120",
      quantity: "3"
    },
    {
      id: "#1234",
      date: "3 October 2024",
      status: "on Hold",
      price: "$120",
      quantity: "3"
    },
    {
      id: "#1234",
      date: "3 October 2024",
      status: "on Hold",
      price: "$120",
      quantity: "3"
    },
    {
      id: "#1234",
      date: "3 October 2024",
      status: "on Hold",
      price: "$120",
      quantity: "3"
    },
    {
      id: "#1234",
      date: "3 October 2024",
      status: "on Hold",
      price: "$120",
      quantity: "3"
    },
    {
      id: "#1234",
      date: "3 October 2024",
      status: "on Hold",
      price: "$120",
      quantity: "3"
    }
  ];

}
