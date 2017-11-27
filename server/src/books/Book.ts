export class Book {
  _id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  constructor (_id: string, title: string, authors: string[], description: string, thumbnail: string) {
    this._id = _id;
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.thumbnail = thumbnail;
  }
}
