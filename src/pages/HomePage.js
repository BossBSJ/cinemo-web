import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogPostCard, BlogPostsSearch } from '../sections/@dashboard/blog';
import AccountPopover from '../layouts/dashboard/header/AccountPopover';
import { useAuthState } from 'react-firebase-hooks/auth'

export default function HomePage({setMovie, movie}) {
    const navigate = useNavigate()

    const [user, setUser] = useState()

    const auth = getAuth()
    const resAuth = useAuthState(auth)
    useEffect(() => {
        setUser(resAuth[0])
    },[resAuth])

    useEffect(() => {
        setMovie()
    },[])

    return(
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Home
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
                {movie?.map((post, index) => (
                    <BlogPostCard key={post.id} post={post} index={index} />
                ))}
            </Grid>
        </Container>
        </>
    )
}
