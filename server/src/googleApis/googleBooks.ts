import { get } from '../helpers';

export const getBook = function (title: string, author: string) {
  return get(
    `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&projection=lite&printType=books&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/imageLinks)&maxResults=1`
  );
};
