import { useEffect, useState } from "react"
import { UseApi } from "../../useApi"

const Genre = () => {
    const [genre, setGenre] = useState([])

    async function fetchGenre() {
        try {
            const {genres} = await UseApi('/genre/movie/list', {
                method: 'GET',
            })
            setGenre(genres)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(genre.length > 0) return
        fetchGenre()
    }, [genre])

    return (
        <div className="genre">
            <h3>Genre</h3>
            <>
                {
                    genre.map((item, index) => (
                        <div key={index} className="genre-item">{item.name}</div>
                    ))
                }
            </>
        </div>
    )
}

export default Genre