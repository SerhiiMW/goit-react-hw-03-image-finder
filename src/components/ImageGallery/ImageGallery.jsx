import styles from "./imageGallery.module.css"
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";


const ImageGallery = ( { showModal, items } ) => {
    return (
        <>
            <ul className={styles.ImageGallery}>
            {items.map(item => 
                <ImageGalleryItem  key={item.id} showModal={showModal} largeImageURL={item.largeImageURL} webformatURL={item.webformatURL}  />
            )}   
            </ul>
        </>
 )}


export default ImageGallery;

