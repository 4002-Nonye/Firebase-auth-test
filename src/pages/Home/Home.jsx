import AppNav from '../../components/AppNav/AppNav';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
function Home() {
  return (
    <div className={styles.wrapper}>
      <AppNav />
      <section>
        <h1 className={styles.h1}>
          Let ArtHub be your canvas for artistic exploration.
        </h1>
        <h2 className={styles.h2}>
          Your haven for artistic expression, where images come to life through
          drag-and-drop arrangements, and tags guide your exploration, opening
          doors to endless creativity and inspiration in every corner.
        </h2>
        <Link to="/login" className={styles.login}>
          View Gallery
        </Link>
      </section>
    </div>
  );
}

export default Home;
