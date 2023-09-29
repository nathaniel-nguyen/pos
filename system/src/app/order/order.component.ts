import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { MenuItem } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  menuItems = this.orderService.menuItems;
  foodTypes = this.orderService.foodTypes;
  items = this.orderService.getItems();
  amounts = this.orderService.getAmounts();
  tax = this.orderService.getTax();
  subtotal = this.orderService.getSubtotal();
  total = this.orderService.getTotal(this.subtotal, this.tax);

  getMenuItemID(menuItem: MenuItem): number {
    return menuItem.id;
  }

  getMenuItemStringID(menuItem: MenuItem): string {
    return menuItem.stringID;
  }

  getMenuItemName(menuItem: MenuItem): string {
    return menuItem.name;
  }

  getMenuItemPrice(menuItem: MenuItem): number {
    return menuItem.price;
  }

  getItems(type: String) {
    if (type == "All") {
      this.menuItems = this.orderService.menuItems;
    } else if (type == "Appetizer") {
      this.getAppetizers();
    } else if (type == "Pho") {
      this.getPhos();
    }
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

  getAppetizers() {
    this.menuItems = this.orderService.getAppetizers();
  }

  getPhos() {
    this.menuItems = this.orderService.getPhos();
  }
}