import { Searchbar } from './Searchbar/Searchbar';
import { fethImages } from '../helpers/pixabeyApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useRef } from 'react';

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
  // const siFirstRender = useRef(true)

  const handleLoadMore = () => {
    console.log(page);
    setPage(prevState => prevState + 1);
  };

  // useEffect(() => {
  //   if (setQuery(query) !== query || setPage(page) !== page) {
  //     setIsLoading(true);
  //     fethImages(query, page)
  //     .then(data => {
  //       setImages(prev => page === 1 ? data.hits : [...prev, ...data.hits]);
  //       setTotalHits(prev =>
  //           page === 1
  //             ? data.totalHits - data.hits.length
  //             : prev - images.length
  //         );
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, [images.length, page, query]);

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
// {!!this.state.totalHits &&
//         (!this.state.isLoading ? (
//           <Button onLoadMore={this.handleLoadMore} />
//         ) : (
//           <Loader />

// // import { render } from "@testing-library/react";
// import React from 'react';
// import { Searchbar } from './Searchbar/Searchbar';
// import { fethImages } from '../helpers/pixabeyApi';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';

// export class App extends React.Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     totalHits: 0,
//     isLoading: false,
//   };

//   hendleSubmitForm = query => {
//     this.setState({ query, page: 1 });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.setState({ isLoading: true });

//       fethImages(query, page)
//         .then(data => {
//           this.setState(prev => ({
//             images: page === 1 ? data.hits : [...prev.images, ...data.hits],
//             totalHits:
//               page === 1
//                 ? data.totalHits - data.hits.length
//                 : data.totalHits - [...prev.images, ...data.hits].length,
//           }));
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.hendleSubmitForm} />
//         <ImageGallery images={this.state.images} />
//         {!!this.state.totalHits &&
//         (!this.state.isLoading ? (
//           <Button onLoadMore={this.handleLoadMore} />
//         ) : (
//           <Loader />
//         ))}
//       </>
//     );
//   }
// }
