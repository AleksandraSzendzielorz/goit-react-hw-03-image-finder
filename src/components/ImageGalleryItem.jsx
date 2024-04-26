import css from '../styles/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  largeImageURL,
  imageURL,
  alt,
  handleOpen,
}) => {
  return (
    <li className={css.galleryItem}>
      <img
        onClick={handleOpen}
        className={css.image}
        src={imageURL}
        alt={alt}
        datasrc={largeImageURL}
      />
    </li>
  );
};
