export interface volume {
  title: string;
  authors: string[];
  description: string;
  imageLinks: pictures;
  owners: string[];
}

export interface pictures {
  thumbnail: string;
  smallThumbnail: string;
}

export class Book {
  _id: string;
  volumeInfo: volume;

  constructor (_id: string, volumeInfo: volume) {
    this._id = _id;
    this.volumeInfo = volumeInfo;
  }
}
