import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() {}

  menuItems = [
    { id: 0, stringID: "1", name: "Shrimp-Pork Spring Rolls", price: 5.50, foodType: "Appetizer" },
    { id: 1, stringID: "2", name: "Chicken Spring Rolls", price: 5.50, foodType: "Appetizer" },
    { id: 2, stringID: "3", name: "BBQ Pork Spring Rolls", price: 5.50, foodType: "Appetizer" },
    { id: 3, stringID: "4", name: "Vegetarian Spring Rolls", price: 4.50, foodType: "Appetizer" },
    { id: 4, stringID: "5", name: "Fried Egg Rolls", price: 6.50, foodType: "Appetizer" },
    { id: 5, stringID: "6", name: "Fried Vegetarian Egg Rolls", price: 6.50, foodType: "Appetizer" },
    { id: 6, stringID: "7", name: "Chicken Wings", price: 8.50, foodType: "Appetizer" },
    { id: 7, stringID: "8", name: "Chicken Banh Mi", price: 8.00, foodType: "Appetizer" },
    { id: 8, stringID: "9", name: "Pork Banh Mi", price: 8.00, foodType: "Appetizer" },
    { id: 9, stringID: "10", name: "Shrimp Egg Rolls", price: 8.00, foodType: "Appetizer" },
    { id: 10, stringID: "11M", name: "Pho Dac Biet M", price: 12.50, foodType: "Pho" },
    { id: 11, stringID: "11L", name: "Pho Dac Biet L", price: 13.50, foodType: "Pho" },
    { id: 12, stringID: "12M", name: "Pho Tai M", price: 11.99, foodType: "Pho" },
    { id: 13, stringID: "12L", name: "Pho Tai L", price: 12.99, foodType: "Pho" },
    { id: 14, stringID: "13M", name: "Pho Bo Vien M", price: 11.99, foodType: "Pho" },
    { id: 15, stringID: "13L", name: "Pho Bo Vien L", price: 12.99, foodType: "Pho" },
    { id: 16, stringID: "14M", name: "Pho Tai Bo Vien M", price: 11.99, foodType: "Pho" },
    { id: 17, stringID: "14L", name: "Pho Tai Bo Vien L", price: 12.99, foodType: "Pho" },
    { id: 18, stringID: "15M", name: "Pho Tai Sach M", price: 11.99, foodType: "Pho" },
    { id: 19, stringID: "15L", name: "Pho Tai Sach L", price: 12.99, foodType: "Pho" },
    { id: 20, stringID: "16M", name: "Pho Tai Gan M", price: 11.99, foodType: "Pho" },
    { id: 21, stringID: "16L", name: "Pho Tai Gan L", price: 12.99, foodType: "Pho" },
    { id: 22, stringID: "17M", name: "Pho Tai Nam M", price: 11.99, foodType: "Pho" },
    { id: 23, stringID: "17L", name: "Pho Tai Nam L", price: 12.99, foodType: "Pho" },
    { id: 24, stringID: "18M", name: "Pho Ga M", price: 11.99, foodType: "Pho" },
    { id: 25, stringID: "18L", name: "Pho Ga L", price: 12.99, foodType: "Pho" },
    { id: 26, stringID: "19M", name: "Pho Chay M", price: 11.99, foodType: "Pho" },
    { id: 27, stringID: "19L", name: "Pho Chay L", price: 12.99, foodType: "Pho" },
  ];

  foodTypes = ["All", "Appetizer", "Pho", "Bun", "Bun Kho", "Com Dia", "Thai", "Drinks"];

  getMenuItems() {
    return this.menuItems;
  }

  getAppetizers(): MenuItem[] {
    let appetizers = [];
    for (let i = 0; i < 10; i++) {
      appetizers.push(this.menuItems[i]);
    }
    return appetizers;
  }

  getPhos(): MenuItem[] {
    let pho = [];
    for (let i = 10; i < 28; i++) {
      pho.push(this.menuItems[i]);
    }
    return pho;
  }

  // newItems(): MenuItem[] {
  //   let newItems: MenuItem[] = [];
  //   return newItems;
  // }

  order: { items: Map<MenuItem, any>, transaction: number, subtotal: number,  tax: number, total: number } = { items: new Map<MenuItem, any>(), transaction: 1, subtotal: 0, tax: 0, total: 0 };

  items = Array.from(this.order.items.keys());
  amounts = Array.from(this.order.items.values());
  
  getSubtotal(): number {
    return (Math.round(this.order.subtotal * 100)/100);
  }

  getTax(): number {
    return (Math.round(this.order.subtotal * 0.07 * 100) / 100);
  }

  getTotal(subtotal: number, tax: number): number {
    let total = subtotal + tax;
    return (Math.round(total * 100)/100);
  }

  getMenuItemID(menuItem: MenuItem): number {
    return menuItem.id;
  }

  // sort(): void {
  //   let tempItem = undefined;
  //   let tempAmount = undefined;
  //   for (let i = 0; i < this.items.length; i++) {
  //     if (this.getMenuItemID(this.items[i]) > this.getMenuItemID(this.items[i + 1])) {
  //       tempItem = this.items[i];
  //       this.items[i] = this.items[i + 1];
  //       this.items[i + 1] = tempItem;
  //       tempAmount = this.amounts[i];
  //       this.amounts[i] = this.amounts[i + 1];
  //       this.amounts[i + 1] = tempAmount;
  //     }
  //   }
  // }

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
    return this.menuItems[id];
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
  foodType: string,
  stringID: string,
  name: string,
  price: number,
}