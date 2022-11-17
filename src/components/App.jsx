import { Searchbar } from './Searchbar/Searchbar';
import { fethImages } from '../helpers/pixabeyApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';


export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const hendleSubmitForm = query => {
    setQuery(query);
    setPage(1);
  };
 

  const handleLoadMore = () => {
    console.log(page);
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    fethImages(query, page)
      .then(data => {
        if (query === '') {
          return;
        }

        setImages(prevState =>
          page === 1 ? [...data.hits] : [...prevState, ...data.hits]
        );
        setTotalHits(prev =>
          page === 1
            ? data.totalHits - data.hits.length
            : prev - data.hits.length
        );
      })
      .finally(() => setIsLoading(false));
  }, [page, query]);

  return (
    <>
      <Searchbar onSubmit={hendleSubmitForm} />
      <ImageGallery images={images} />
      {!!totalHits &&
        (!isLoading ? <Button onLoadMore={handleLoadMore} /> : <Loader />)}
    </>
  );
};
