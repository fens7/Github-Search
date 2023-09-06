import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getFavorites } from '../../redux/github/github.slice';

function Favorites() {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.github.favorites);

    React.useEffect(() => {
        dispatch(getFavorites());
    }, [dispatch]);

    return (
        <div style={{ textAlign: 'center', margin: '4rem 0' }}>
            {!favorites.length && <p>Empty list...</p>}
            {favorites?.map((favorite) => (
                <li key={favorite.id}>
                    <a target="_blank" href={favorite.favoriteUrl}>
                        {favorite.favoriteUrl}
                    </a>
                </li>
            ))}
        </div>
    );
}

export default Favorites;
