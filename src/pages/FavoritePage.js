import { Button, Grid, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import AccountPopover from "../layouts/dashboard/header/AccountPopover";
import { BlogPostCard, BlogPostsSearch } from "../sections/@dashboard/blog";
import { readFavorite } from "../services/favoriteFirebase";


export default function FavoritePage({setMovie, movie}) {
    const navigate = useNavigate()

    const [user, setUser] = useState()
    const [favoriteLists, setFavoriteLists] = useState([])

    const auth = getAuth()
    const resAuth = useAuthState(auth)
    useEffect(() => {
        setUser(resAuth[0])
    },[resAuth])
 
    useEffect(() => {
        setMovie()
    },[])

    useEffect(() => {
        async function fetchFavoriteList(){  
            if(!user)
                return

            const favoriteMovie = await readFavorite(user?.uid)
            const favoriteMovieArray = favoriteMovie?.movieId
            const favoriteLists = movie?.filter(movie => favoriteMovieArray?.includes(movie.id))
            setFavoriteLists(favoriteLists)

        }
        fetchFavoriteList()
    },[user, movie])

    return(
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Favorite
                </Typography>
                {user===null?
                (<Button variant="contained" onClick={() => navigate("/signin")}>
                    Sign In 
                </Button>) : (
                <AccountPopover user={user}/>
                )}
            </Stack>

            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                <BlogPostsSearch posts={movie} />
            </Stack>

            <Grid container spacing={3}>
                {favoriteLists?.map((post, index) => (
                    <BlogPostCard key={post.id} post={post} index={index} />
                ))}
            </Grid>
        </Container>
    </>
    )
}