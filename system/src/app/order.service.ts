import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() {}

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

  getMenuItems() {
    return this.menuItems;
  }

  order: { items: Map<MenuItem, any>, transaction: number, subtotal: number,  tax: number, total: number } = { items: new Map<MenuItem, any>(), transaction: 1, subtotal: 0, tax: 0, total: 0 };

  items = Array.from(this.order.items.keys());
  amounts = Array.from(this.order.items.values());
  
  getSubtotal(): number {
    return this.order.subtotal;
  }

  getTax(): number {
    return (Math.round(this.order.subtotal * 0.07 * 100) / 100);
  }

  getTotal(subtotal: number, tax: number): number {
    let total = subtotal + tax;
    return total;
  }

  getMenuItemID(menuItem: MenuItem): number {
    return menuItem.id;
  }

  sort(): void {
    let tempItem = undefined;
    let tempAmount = undefined;
    for (let i = 0; i < this.items.length; i++) {
      if (this.getMenuItemID(this.items[i]) > this.getMenuItemID(this.items[i + 1])) {
        tempItem = this.items[i];
        this.items[i] = this.items[i + 1];
        this.items[i + 1] = tempItem;
        tempAmount = this.amounts[i];
        this.amounts[i] = this.amounts[i + 1];
        this.amounts[i + 1] = tempAmount;
      }
    }
  }

  getItems() {
    return this.items;
  }

  getAmounts() {
    return this.amounts;
  }

  newOrder(): void {
    this.order = { items: new Map<MenuItem, any>(), transaction: this.order.transaction + 1, subtotal: 0, tax: 0, total: 0 };
    this.items = [];
    this.amounts = [];
  }

  getItem(id: number): MenuItem {
    return this.menuItems[id - 1];
  }

  addItemToOrder(id: number): void {
    if (!this.order.items.has(this.getItem(id))) {
      this.order.items.set(this.getItem(id), 1);
      this.order.subtotal += this.getItem(id).price;
      this.items = Array.from(this.order.items.keys());
      this.amounts = Array.from(this.order.items.values());
    } else {
      this.order.items.set(this.getItem(id), this.order.items.get(this.getItem(id)) + 1);
      this.order.subtotal += this.getItem(id).price;
      this.items = Array.from(this.order.items.keys());
      this.amounts = Array.from(this.order.items.values());
    }
  }

  removeItemFromOrder(id: number): void {
    if (this.order.items.get(this.getItem(id)) === 1) {
      this.order.items.delete(this.getItem(id));
      this.order.subtotal -= this.getItem(id).price;
      this.items = Array.from(this.order.items.keys());
      this.amounts = Array.from(this.order.items.values());
    } else if (this.order.items.get(this.getItem(id)) > 1) {
      this.order.items.set(this.getItem(id), this.order.items.get(this.getItem(id)) - 1);
      this.order.subtotal -= this.getItem(id).price;
      this.items = Array.from(this.order.items.keys());
      this.amounts = Array.from(this.order.items.values());
    }
  }
}

export interface MenuItem {
  id: number,
  name: string,
  price: number,
}