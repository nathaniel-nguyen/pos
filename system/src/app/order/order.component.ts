import { Component } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  menuItems = this.orderService.getMenuItems();
  order = this.orderService.getOrder();
  total = this.orderService.getTotal();
  tax = this.orderService.getTax();

  constructor(
    private orderService: OrderService,
  ) { }

  increaseQuantity(id: number): void {
    this.orderService.addItemToOrder(id);
    this.total = this.orderService.getTotal();
    this.tax = this.orderService.getTax();
  }

  decreaseQuantity(id: number): void {
    this.orderService.removeItemFromOrder(id);
    this.total = this.orderService.getTotal();
    this.tax = this.orderService.getTax();
  }
}