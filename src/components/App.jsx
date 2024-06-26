import css from '../styles/App.module.css';
import { useState, useEffect } from 'react';
import { useRef } from 'react';

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
  const [clicked, setClicked] = useState(false);
  const [modalAlt, setModalAlt] = useState('');
  const [modalSrc, setModalSrc] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const timerRef = useRef(null);

  const handleForm = (event, inputValue) => {
    event.preventDefault();
    setImages([]);
    console.log(
      `handleForm: input value - ${inputValue}, current page - ${currentPage}`
    );

    if (!inputValue) {
      const errorMessage = 'Please fill the search field';
      setError(errorMessage);
      return <div className={css.errorMessage}>{errorMessage}</div>;
    }
    setSearchValue(inputValue);
    setCurrentPage(1);
  };

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
    const query = `https://pixabay.com/api/?q=${searchValue}&page=${currentPage}&key=43488285-94d76aad4f65df3a3d61f010f&image_type=photo&orientation=horizontal&per_page=12`;
    console.log('fetchData');
    try {
      const response = await fetch(query);
      const data = await response.json();
      const fetchedImages = data.hits;

      const uniqueImages = fetchedImages.filter(
        image => !images.some(existingImage => existingImage.id === image.id)
      );

      if (uniqueImages.length === 0) {
        setError('Sorry, there are no matches.');
      } else {
        setImages(prevImages => [...prevImages, ...uniqueImages]);
      }
    } catch (error) {
      setError('Sorry, could not get images from the server');
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    if (searchValue || currentPage > 1) {
      console.log('useEffect if');
      setError('');
      setLoading(true);
      timerRef.current = setTimeout(() => {
        fetchData();
        setLoading(false);
      }, 300);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, currentPage]);

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'Escape' && clicked) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [clicked]);

  return (
    <div className={css.app}>
      <Searchbar handleForm={handleForm} />
      {searchValue && (
        <>
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
          {images.length > 0 && <Button handlePage={handlePage} />}
        </>
      )}
      {clicked && (
        <Modal alt={modalAlt} src={modalSrc} handleClose={handleClose} />
      )}
      {error && <div>{error}</div>}
    </div>
  );
};
