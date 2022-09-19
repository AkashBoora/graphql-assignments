exports.Query = {
    movies:(parent,{filter},{db})=>{
        let movies = db.movies;
        if(filter){
            if(filter.titleContains){
                movies = movies.filter(movie=>movie.title.toLowerCase().includes(filter.titleContains.toLowerCase()));
            }
            if(filter.majorGenre){
                movies = movies.filter(movie=>movie.majorGenre.toLowerCase()===filter.majorGenre.toLowerCase());
            }
        }
        return movies;
    },
    movie: (parent,{id},{db}) => {
        return db.movies.find(movie=> movie.id===id)
    }
}