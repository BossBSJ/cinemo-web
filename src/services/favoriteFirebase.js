import { getDatabase, ref, set, get, child, update } from "firebase/database";

async function writeFavorite(userId, movieId) {
    const db = getDatabase();
    let res = await readFavorite(userId)
    if(!res){
        await set(ref(db, 'favorite/' + userId), {
            movieId: [movieId]
        });
    } else {
        let favMovieArr = res.movieId
        if(favMovieArr.includes(movieId)){
            return
        }
        let newFavoriteArr = [...favMovieArr,movieId]
        await set(ref(db, 'favorite/' + userId), {
            movieId: [...newFavoriteArr]
        });
    }
}

async function deleteFavorite(userId, movieId) {
    const db = getDatabase();

    const favoriteMovie = await readFavorite(userId)
    const favoriteMovieArray = favoriteMovie?.movieId

    const index = favoriteMovieArray.indexOf(movieId)
    favoriteMovieArray.splice(index, 1)
    const newData = {
        movieId: favoriteMovieArray
    }

    const updates = {};
    updates['/favorite/' + userId] = newData;

    return update(ref(db), updates);


}

const readFavorite = async (userId) => {
    const dbRef = ref(getDatabase());
    const value = await get(child(dbRef, 'favorite/' + userId)).then((snapshot) => { 
    if (snapshot.exists()) {
        const value = snapshot.val();
        return value
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error(error);
    });
    if(value)
        return value
}

export {writeFavorite, readFavorite, deleteFavorite}