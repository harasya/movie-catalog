import { Link, useSearchParams } from "react-router-dom"

const Movie = () => {
    const [searchParams] = useSearchParams();
    const movie = searchParams.get('movie');

    const list = [
        {
            title: 'Now Playing',
            slug: 'now_playing'
        },
        {
            title: 'Popular',
            slug: 'popular'
        },
        {
            title: 'Top Rated',
            slug: 'top_rated'
        },
        {
            title: 'Upcoming',
            slug: 'upcoming'
        },
    ]

    return (
        <div className="movie">
            {
                list.map((item, index) => (
                    <div key={index} className={`movie-item ${item.slug === movie ? 'active' : ''}`}>
                        <Link to={`/?movie=${item.slug}`}>
                            {item.title}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Movie