import { Component } from 'react';
import styles from './searchbar.module.css';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { RotatingLines } from 'react-loader-spinner';

import { searchImg } from '../../api/image';


class ImgSearchForm extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({
      search: '',
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;

    return (
      <header className={styles.Searchbar}>
        <form onSubmit={handleSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>&#128269;</span>
          </button>
          <input
            value={search}
            onChange={handleChange}
            required
            className={styles.SearchFormInput}
            type="text"
            name="search"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

class ImgSearch extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    largeImg: '',
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchImg();
    }
  }

  async fetchImg() {
    const { search, page } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const { data } = await searchImg(search, page);
      this.setState(({ images }) => ({
        images: data.hits?.length ? [...images, ...data.hits] : images,
        loadMoreBtn: this.state.page < Math.ceil(data.totalHits / 12 )
      }));
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearch = ({ search }) => {
    this.setState({
      search,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = ({ largeImageURL }) => {
    this.setState({
      modalOpen: true,
      largeImg: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      largeImg: '',
    });
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const { images, loading, error, modalOpen, largeImg, loadMoreBtn } = this.state;

    const isImages = Boolean(images.length);

    return (
      <>
        <ImgSearchForm onSubmit={handleSearch} />
        {error && <p className={styles.error}>{error}</p>}
        {loading && <RotatingLines />}
        {isImages && <ImageGallery showModal={showModal} items={images} />}
        {isImages && loadMoreBtn && (
          <div className={styles.loadMoreWrapper}>
            <Button onClick={loadMore} type="button">
              Load more
            </Button>
          </div>
        )}
        {modalOpen && (
          <Modal close={closeModal}>
              <img className={styles.modalImg} src={largeImg} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImgSearch;
