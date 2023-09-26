import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { MenuItem } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  menuItems = this.orderService.getMenuItems();
  items = this.orderService.getItems();
  amounts = this.orderService.getAmounts();
  tax = this.orderService.getTax();
  subtotal = this.orderService.getSubtotal();
  total = this.orderService.getTotal(this.subtotal, this.tax);

  foodTypes = [
    { name: "Pho" },
    { name: "Bun" },
    { name: "Bun Kho" },
    { name: "Com Dia" },
    { name: "Thai" },
    { name: "Drinks" },
  ];

  getMenuItemID(menuItem: MenuItem): number {
    return menuItem.id;
  }

  getMenuItemName(menuItem: MenuItem): string {
    return menuItem.name;
  }

  getMenuItemPrice(menuItem: MenuItem): number {
    return menuItem.price;
  }

  constructor(
    private orderService: OrderService,
  ) { }

  increaseQuantity(id: number): void {
    this.orderService.addItemToOrder(id);
    this.tax = this.orderService.getTax();
    this.subtotal = this.orderService.getSubtotal();
    this.total = this.orderService.getTotal(this.subtotal, this.tax);
    this.items = this.orderService.getItems();
    this.amounts = this.orderService.getAmounts();
  }

  decreaseQuantity(id: number): void {
    this.orderService.removeItemFromOrder(id);
    this.tax = this.orderService.getTax();
    this.subtotal = this.orderService.getSubtotal();
    this.total = this.orderService.getTotal(this.subtotal, this.tax);
    this.items = this.orderService.getItems();
    this.amounts = this.orderService.getAmounts();
  }

  newOrder(): void {
    this.orderService.newOrder();
    this.tax = this.orderService.getTax();
    this.subtotal = this.orderService.getSubtotal();
    this.total = this.orderService.getTotal(this.subtotal, this.tax);
    this.items = this.orderService.getItems();
    this.amounts = this.orderService.getAmounts();
  }
}