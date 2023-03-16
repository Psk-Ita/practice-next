import { fetcher } from '@/utils';
import styles from '@/styles/BookDetails.module.scss'
import useSWR from 'swr';

export interface BookDetailProps {
    bookId:string;
}

export default function BookDetail ({bookId}:BookDetailProps) :JSX.Element {

const { data : book, error, isLoading } = useSWR(`/api/books/${bookId}`, fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div className={styles.BookDetails}><div className="container">loading...</div></div>
  
  const cover = book?.covers?.[0]
  
  return <div title={book.subtitle} className={styles.BookDetails}>
    <div id={bookId}>{ book.title }</div>
    <div className="container">
    {cover ?
        <img src={'https://covers.openlibrary.org/b/id/' + book.covers[0] + '-M.jpg'} style={{width:'100%'}}/> : 
        <img src='https://i0.wp.com/thealmanian.com/wp-content/uploads/2019/01/product_image_thumbnail_placeholder.png' style={{width:'100%'}} />
    }
    </div> 
    {(book.authors ?? []).map((a) => (<p key={a.key}>{a.key}</p>))}
    <div >{ book.publish_date }</div>
  </div>

}

