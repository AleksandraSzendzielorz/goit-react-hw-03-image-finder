import css from '../styles/App.module.css';
import { useState, useEffect } from 'react';

import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [modalAlt, setModalAlt] = useState('');
  const [modalSrc, setModalSrc] = useState('');

  let timer = null;

  const handleOpen = event => {
    setClicked(true);
    const alt = event.target.alt;
    const src = event.target.getAttribute('datasrc');
    setModalAlt(alt);
    setModalSrc(src);
  };

  const handleClose = () => {
    setClicked(false);
  };

  const handlePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const fetchData = async () => {
    const query = `https://pixabay.com/api/?q=&page=${currentPage}&key=42513703-cc305044521a10f5f63ac2280&image_type=photo&orientation=horizontal&per_page=12`;
    try {
      const response = await fetch(query);
      const data = await response.json();
      const uniqueImages = data.hits.filter(
        image => !images.some(existingImage => existingImage.id === image.id)
      );
      setImages(prevImages => [...prevImages, ...uniqueImages]);
      console.log(uniqueImages);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (mounted) {
      setLoading(true);
      timer = setTimeout(() => {
        fetchData();
        setLoading(false);
      }, 300);
    } else {
      setMounted(true);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, mounted]);

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'Escape' && clicked) {
        handleClose();
        // console.log('closing window');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [clicked]);

  return (
    <div className={css.app}>
      <Searchbar />
      {images.length > 0 && (
        <ImageGallery>
          {images.map(({ largeImageURL, webformatURL, tags, id }) => (
            <ImageGalleryItem
              key={id}
              imageURL={webformatURL}
              alt={tags}
              handleOpen={handleOpen}
              largeImageURL={largeImageURL}
            />
          ))}
        </ImageGallery>
      )}
      {loading && <Loader />}
      <Button handlePage={handlePage} />
      {clicked && (
        <Modal alt={modalAlt} src={modalSrc} handleClose={handleClose} />
      )}
      {error}
    </div>
  );
};
