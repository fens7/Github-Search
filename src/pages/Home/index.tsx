import React from 'react';
import { useLazyGetUsersReposQuery, useSearchUsersQuery } from '../../redux/github/github.api';
import { useDebounce } from '../../hooks/useDebounce';

import UserCard from '../../components/UserCard';
import { getFavorites } from '../../redux/github/github.slice';
import { useAppDispatch } from '../../hooks/hooks';

import styles from './Home.module.css';

function Home() {
    const [search, setSearch] = React.useState('');
    const [dropdown, setDropdown] = React.useState(false);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getFavorites());
    }, []);

    const debounced = useDebounce(search, 900);

    const { isLoading, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 2,
    });

    const [fetchRepos, { isLoading: isRepoLoading, data: repos }] = useLazyGetUsersReposQuery();

    React.useEffect(() => {
        setDropdown(debounced.length > 2 && (data?.length || 0) > 0);
    }, [debounced, data]);

    const userClickHandler = async (user: string) => {
        fetchRepos(user);
        setDropdown(false);
    };

    return (
        <div className={styles.container}>
            <div style={{ position: 'relative', width: '560px' }}>
                <input
                    type="text"
                    placeholder="Search for github user..."
                    className={styles.search}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {dropdown && (
                    <ul className={styles.dropdown}>
                        {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
                        {data?.map((user) => (
                            <li
                                onClick={() => userClickHandler(user.login)}
                                key={user.id}
                                className={styles.dropdownItem}>
                                {user.login}
                            </li>
                        ))}
                    </ul>
                )}

                <div style={{ marginTop: '22px' }}>
                    {isRepoLoading && (
                        <p style={{ textAlign: 'center' }}>Repositories are loading...</p>
                    )}
                    {repos?.map((repo) => (
                        <UserCard key={repo.id} repo={repo} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
