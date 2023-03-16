export interface getBookDetailOptions {
    id:string
}

export interface KeyItem {
    key:string;
}

export interface Book {
    identifiers: Record<string, string[]>
    title: string,
    subtitle?:string,
    authors: KeyItem[],
    publish_date: string,
    publishers: string[]
    covers: number[],
    ocaid: string,
    contributions: string[],
    languages: KeyItem[],
    type: KeyItem,
    key: string,
    number_of_pages: number,
    works: KeyItem[],
    latest_revision: number,
    revision: number,
  }

export interface getBookDetailPayload {
    book:Book
}

export const getBookDetails = async({id} : getBookDetailOptions) : Promise<getBookDetailPayload> => {
    const response = await fetch(`https://openlibrary.org/books/${id}.json`);
    const book = await response.json() as Book;
    return Promise.resolve({ book });
}
