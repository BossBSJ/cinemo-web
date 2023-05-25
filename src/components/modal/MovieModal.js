import { Card, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { readFavorite, writeFavorite, deleteFavorite } from "../../services/favoriteFirebase";

export default function MovieModal({open, onClose, post}){
    const [user, setUser] = useState()
    const [favoriteMovieArray, setFavoriteMovieArray] = useState([])

    const auth = getAuth()
    const resAuth = useAuthState(auth)
    useEffect(() => {
        setUser(resAuth[0])
    },[resAuth])

    useEffect(() => {
        async function fetchFavoriteList(){  
            if(!user)
                return

            const favoriteMovie = await readFavorite(user?.uid)
            const favoriteMovieArray = favoriteMovie?.movieId
            if(favoriteMovieArray)
                setFavoriteMovieArray(favoriteMovieArray)
            else 
                setFavoriteMovieArray([])
        }
        fetchFavoriteList()
    }, [user])


    const handelFavorite = async (movie) => {
        await writeFavorite(user?.uid, movie?.id)
    }

    const handleUnfavorite = async (movie) => {
        await deleteFavorite(user?.uid, movie?.id)
        onClose()
        window.location.reload()
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Card
                sx={{
                    padding: "20px", 
                    position:"absolute", 
                    left:"50%", top:"50%", 
                    transform: "translate(-50%, -50%)", 
                    display:"flex", 
                    flexDirection:"column", 
                    justifyContent:"space-between",
                    border: 0
                }}
            >
                {post && <CardMedia
                    sx={{ backgroundSize: 'contain', height:"50vh" }}
                    image={post?.poster_url}
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {post?.title_en}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post?.synopsis_th}
                    </Typography>
                    <Typography >
                        {post?.genre}
                    </Typography>
                    {favoriteMovieArray?.includes(post?.id) ? (
                        <StarIcon sx={{cursor: 'pointer'}} onClick={() => handleUnfavorite(post)}/>
                        ) : (
                        <StarBorderIcon sx={{cursor: 'pointer'}} onClick={() => handelFavorite(post)}/>
                        )
                    }
                </CardContent>
            </Card>
        </Modal>
    )
}