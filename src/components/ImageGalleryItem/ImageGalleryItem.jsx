import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ showModal, items }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL }) => (
    <li key={id} onClick={() => showModal({ largeImageURL })} className={styles.ImageGalleryItem} >
      <img className={styles.ImageGalleryItemImage} src={webformatURL} alt="" />
    </li>
  ));

  return <ul className={styles.ImageGallery}>{elements}</ul>;
};

export default ImageGalleryItem;
