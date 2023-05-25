import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movie: []
    },
    reducers: {
        getMovie: (state, action) => {
            state.movie = action.payload
        } 
    },
})

const { actions, reducer } = movieSlice

const { getMovie } = actions

export default reducer

export const fetchMovieAsyncThunk = () =>  (dispatch) => {
    axios.get("https://www.majorcineplex.com/apis/get_movie_avaiable")
    .then((response) => {
        const data = response.data.movies
        dispatch(getMovie(data))
    })
    .catch((error) =>{
        console.log(error)
    })
}
