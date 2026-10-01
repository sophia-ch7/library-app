export interface HasId {
  id: string;
}

export class Library<T extends HasId> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = items;
  }

  add(item: T): void {
    this.items.push(item);
  }

  remove(id: string): boolean {
    const before = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < before;
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  find(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  getAll(): T[] {
    return [...this.items];
  }
}
