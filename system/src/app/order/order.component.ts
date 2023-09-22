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
  tax = this.orderService.getTax();
  subtotal = this.orderService.getSubtotal();
  total = this.orderService.getTotal(this.subtotal, this.tax);
  quantityMap = this.orderService.getQuantityMap();
  quantityMapArrayValues = Array.from(this.quantityMap.values());
  // quantityMapArrayKeys = Array.from(this.quantityMap.keys());

  constructor(
    private orderService: OrderService,
  ) { }

  increaseQuantity(id: number): void {
    this.orderService.addItemToOrder(id);
    this.tax = this.orderService.getTax();
    this.subtotal = this.orderService.getSubtotal();
    this.total = this.orderService.getTotal(this.subtotal, this.tax);
    this.quantityMapArrayValues = Array.from(this.quantityMap.values());
    // this.quantityMapArrayKeys = Array.from(this.quantityMap.keys());

  }

  decreaseQuantity(id: number): void {
    this.orderService.removeItemFromOrder(id);
    this.tax = this.orderService.getTax();
    this.subtotal = this.orderService.getSubtotal();
    this.total = this.orderService.getTotal(this.subtotal, this.tax);
    this.quantityMapArrayValues = Array.from(this.quantityMap.values());
    // this.quantityMapArrayKeys = Array.from(this.quantityMap.keys());
  }
}