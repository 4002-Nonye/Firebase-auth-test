/* eslint-disable react/prop-types */
import styles from './Card.module.css';

const Card = ({ image }) => {
  return (
    <>
      <div className={styles.container}>
        {' '}
        <p className={styles.tag}>
          <span className={styles.heart}>&hearts;</span>
          <span className={styles.likes}> {image.likes}</span>
        </p>
        <img src={image.urls.small} alt={image.alt_description} />
      </div>
    </>
  );
};

export default Card;
