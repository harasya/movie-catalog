import { useCallback, useEffect, useState } from "react";
import { UseApi } from "../../useApi";
import Filter from "./Filter";
import { NavLink, useSearchParams } from 'react-router-dom';

const List = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const imageUrl = process.env.REACT_APP_IMAGE_URL + '/w500';
    const [searchParams, setSearchParams] = useSearchParams();
    const movie = searchParams.get('movie');
    const keyword = searchParams.get('search');
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    const showMore = () => {
        setPage(page + 1)
    }

    const fetchSearchProducts = useCallback(async () => {
        try {
            const {results, total_results} = await UseApi('/search/movie', {
                method: 'GET',
                params: {query: keyword}
            })
            setProducts(results);
            setTotal(total_results)
        } catch (err) {
            setError(err.message);
        }
    }, [keyword])

    const fetchProducts = useCallback(async (slug) => {
        try {
            const {results, total_results} = await UseApi(`/movie/${slug}`, {
                method: 'GET',
                params: {page}
            })
            setProducts((prevProducts) => [...prevProducts, ...results]);
            setTotal(total_results)
        } catch (err) {
            setError(err.message);
        }
    }, [page])

    useEffect(() => {
        if(keyword === null) {
            setProducts([])
        }

        if(keyword)
            fetchSearchProducts()

    }, [keyword, fetchSearchProducts])

    useEffect(() => {
        if(movie) {
            fetchProducts(movie);
        }
    }, [movie, page, fetchProducts])

    useEffect(() => {
        if(!movie) {
            setSearchParams({movie: 'now_playing'})
        }
    }, [movie, setSearchParams])


    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div className="products">
            <h2>Movie Catalog</h2>
            <div className="products-container">
                <Filter />
                <div>
                    <div className="total">
                        Found <strong>{total}</strong> items
                    </div>
                    <div className="lists">
                        {
                            products.map((product, index) => (
                                <NavLink to={`movie/${product.id}`} key={index}>
                                    <img src={imageUrl + product.poster_path} alt="" />
                                    <span>{product.original_title}</span>
                                </NavLink>
                            ))
                        }
                    </div>
                    <div className="show-more" onClick={showMore}>
                        Show more
                    </div>
                </div>
            </div>
        </div>
    );
}
export default List;