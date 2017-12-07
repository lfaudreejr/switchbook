export class User {
  _id: string;
  books: string[];

  constructor (_id: string) {
    this._id = _id;
  }
}
