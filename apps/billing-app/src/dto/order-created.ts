export class OrderCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly price: number,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      price: this.price,
    });
  }
}
