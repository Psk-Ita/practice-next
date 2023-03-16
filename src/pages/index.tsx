import { getRecentChanges, getRecentChangesPayload } from "../hooks/recentchanges";

import BookDetail from "../components/BookDetail/[bookId]";
import styles from '@/styles/Home.module.scss'

interface HomeServerSideProps {
  props : getRecentChangesPayload
}

export const getServerSideProps = async() : Promise<HomeServerSideProps> => {
  const props = await getRecentChanges();
  return Promise.resolve({ props } as HomeServerSideProps);
}


const Home = ({list}:getRecentChangesPayload) => (
    <div className={styles.results}>
      {list.map((l:string) => (
        <div key={`${l}`} className={styles.element}>
          <BookDetail bookId={l} />
        </div>
        )
      )}
    </div>
  )


export default Home
