/**
 * Exercise 7: Write a class User with private property name and getter/setter.
 */
export class User {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (newName.trim().length > 0) {
      this._name = newName;
    } else {
      console.log("Name cannot be empty.");
    }
  }
}
