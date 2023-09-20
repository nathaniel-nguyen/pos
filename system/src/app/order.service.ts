import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  menuItems = [
    { id: 1, name: "Shrimp-Pork Spring Rolls", price: 5.50 },
    { id: 2, name: "Chicken Spring Rolls", price: 5.50 },
    { id: 3, name: "BBQ Pork Spring Rolls", price: 5.50 },
    { id: 4, name: "Vegetarian Spring Rolls", price: 4.50 },
    { id: 5, name: "Fried Egg Rolls", price: 6.50 },
    { id: 6, name: "Fried Vegetarian Egg Rolls", price: 6.50 },
    { id: 7, name: "Chicken Wings", price: 8.50 },
    { id: 8, name: "Chicken Banh Mi", price: 8.00 },
    { id: 9, name: "Pork Banh Mi", price: 8.00 },
    { id: 10, name: "Shrimp Egg Rolls", price: 8.00 },
  ];

  order: { items: MenuItem[], transaction: number, total: number, tax: number } = { items: [], transaction: 1, total: 0, tax: 0 };

  constructor() { }

  getTotal(): number {
    return Math.round(this.getOrder().total * 1.07 * 100)/100;
  }

  getTax(): number {
    return Math.round(this.getOrder().total * 0.07 * 100)/100;
  }

  getMenuItems() {
    return this.menuItems;
  }

  getOrder() {
    this.order.items.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    return this.order;
  }

  newOrder(): void {
    this.order = { items: [], transaction: this.order.transaction + 1, total: 0, tax: 0 };
  }

  getItem(id: number): MenuItem {
    return this.menuItems[id - 1];
  }

  addItemToOrder(id: number): void {
    this.order.items.push(this.getItem(id));
    this.order.tax += Math.round(this.getItem(id).price * 0.07 * 100)/100
    this.order.total += this.getItem(id).price;
  }

  removeItemFromOrder(id: number): void {
    if (this.order.items.indexOf(this.getItem(id)) !== -1) {
      this.order.items.splice(this.order.items.lastIndexOf(this.getItem(id)), 1);
      this.order.tax -= Math.round(this.getItem(id).price * 0.07 * 100) / 100;
      this.order.total -= this.getItem(id).price;
    }
  }

}

export interface MenuItem {
  id: number,
  name: string,
  price: number,
}