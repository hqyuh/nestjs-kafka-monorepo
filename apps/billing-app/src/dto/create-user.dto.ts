export class UserCreateEvent {
  constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly gender: string,
  ) {}

  toString() {
    return JSON.stringify({
      name: this.name,
      age: this.age,
      gender: this.gender,
    });
  }
}
