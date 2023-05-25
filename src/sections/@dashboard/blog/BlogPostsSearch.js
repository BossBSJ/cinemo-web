import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, Box, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { useState } from 'react';
import MovieModal from '../../../components/modal/MovieModal';


// ----------------------------------------------------------------------

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function BlogPostsSearch({ posts }) {
  const [showMovieModal, setShowMovieModal] = useState(false)
  const [movie, setMovie] = useState()
  const handleOpenMovieModal = () => {
    setShowMovieModal(true)
  }
  const handleCloseMovieModal = () => {
    setShowMovieModal(false)
  }

  const handleClick = (movie) => {
    if(!movie)
      return
    handleOpenMovieModal()
    setMovie(movie)
  }

  return (
    <Box>
      <Autocomplete
        sx={{ width: 280 }}
        autoHighlight
        popupIcon={null}
        PopperComponent={StyledPopper}
        options={posts}
        getOptionLabel={(post) => post.title_en}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search post..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        )}
        onChange={(e, post) => {handleClick(post)}}
      />
      <MovieModal
        open={showMovieModal}
        onClose={handleCloseMovieModal}
        post={movie}
      />
    </Box>
  );
}
