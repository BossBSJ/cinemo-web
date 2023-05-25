import { connect } from "react-redux";
import FavoritePage from "../pages/FavoritePage";
import HomePage from "../pages/HomePage";
import { fetchMovieAsyncThunk } from "../reducer/movieSlice";

const mapStateToProps = (state) => {
    return {
        movie: state.movie.movie,
    };
};
    
const mapDispatchToProps = (dispatch) => {
    return {
        setMovie: () => {
            dispatch(fetchMovieAsyncThunk())
        },
    };
};

export const HomepageFromContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export const FavoritePageFromContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritePage);