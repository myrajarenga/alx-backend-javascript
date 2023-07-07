export default class car {
  consructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  get brand() {
    return this._brand;
  }

  get motor() {
    return this._motor;
  }

  get color() {
    return this._color;
  }

  cloneCar() {
    const clone = new this.constructor();
    Object.getOwnPropertyNames(this).forEach((prop) => {
      clone[prop] = this[prop];
    });
    return clone;
  }
}
