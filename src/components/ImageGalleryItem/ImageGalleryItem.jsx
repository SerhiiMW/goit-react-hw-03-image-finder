import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ showModal, id, webformatURL, largeImageURL }) => {
  return (
    <>
    <li key={id} onClick={() => showModal({ largeImageURL })} className={styles.ImageGalleryItem} >
      <img className={styles.ImageGalleryItemImage} src={webformatURL} alt="" />
    </li>
    </>
  );
};

export default ImageGalleryItem;
