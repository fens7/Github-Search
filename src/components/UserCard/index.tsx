import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addToFavorites, removeFromFavorites } from '../../redux/github/github.slice';

import { IRepo } from '../../models/models';

import styles from './UserCard.module.css';

function UserCard({ repo }: { repo: IRepo }) {
    const dispatch = useAppDispatch();

    const favoriteRepos = useAppSelector((state) => state.github.favorites);

    const isFav = favoriteRepos.some((fav) => fav.id === repo.id);

    const handleToggleFavorite = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (isFav) {
            await dispatch(removeFromFavorites(repo.id));
        } else {
            await dispatch(addToFavorites({ id: repo.id, favoriteUrl: repo.html_url }));
        }
    };

    return (
        <div className={styles.list}>
            <a href={repo.html_url} target="_blank">
                <h2 style={{ fontWeight: 800 }}>{repo.full_name}</h2>
                <p style={{ fontWeight: 500 }}>
                    Forks: <span style={{ fontWeight: 800, marginRight: '8px' }}>{repo.forks}</span>
                    Watchers: <span style={{ fontWeight: 800 }}>{repo.watchers}</span>
                </p>
            </a>

            <p>{repo?.description}</p>

            {isFav ? (
                <button onClick={handleToggleFavorite} className={styles.removeFavoriteBtn}>
                    ★ Remove from favorites
                </button>
            ) : (
                <button onClick={handleToggleFavorite} className={styles.addFavoriteBtn}>
                    ★ Add to favorites
                </button>
            )}
        </div>
    );
}

export default UserCard;
