// import { render } from "@testing-library/react";
import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fethImages } from '../helpers/pixabeyApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalHits: 0,
    isLoading: false,
  };

  hendleSubmitForm = query => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      fethImages(query, page)
        .then(data => {
          this.setState(prev => ({
            images: page === 1 ? data.hits : [...prev.images, ...data.hits],
            totalHits:
              page === 1
                ? data.totalHits - data.hits.length
                : data.totalHits - [...prev.images, ...data.hits].length,
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.hendleSubmitForm} />
        <ImageGallery images={this.state.images} />
        {!!this.state.totalHits && 
        (!this.state.isLoading ? (
          <Button onLoadMore={this.handleLoadMore} />
        ) : (
          <Loader />
        ))}
      </>
    );
  }
}
