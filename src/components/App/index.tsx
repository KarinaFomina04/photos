import React from "react";
import style from './App.modules.scss'
import Collection from '../Collection';

const cats = [
    { "name": "All" },
    { "name": "Sea" },
    { "name": "Mountains" },
    { "name": "Architecture" },
    { "name": "Cities" }
];

const App: React.FC = () => {
    const [categoryId, setCategoryId] = React.useState(0);
    const [isLouding, setIsLouding] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState('');
    const [collections, setCollections] = React.useState([]);
    React.useEffect(() => {
        setIsLouding(true);

        const category = categoryId ? `category=${categoryId}` : '';

        fetch(`https://6366ecd1f5f549f052ce631b.mockapi.io/photos?page=${page}&limit=3&${category}`,
        )
            .then((res) => res.json())
            .then((json) => {
                setCollections(json);
            })
            .catch(err => {
                console.warn(err);
                alert('Error while getting data.');
            })
            .finally(() => setIsLouding(false));
    }, [categoryId, page]);

    return (
        <div className={style.App}>
            <h1>My photos</h1>
            <div className={style.top}>
                <ul className={style.tags}>
                    {cats.map((obj, i) => (
                        <li
                            onClick={() => setCategoryId(i)}
                            className={categoryId == i ? style.active : ''}
                            key={obj.name}>{obj.name}
                        </li>
                    ))}
                </ul>
                <input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    className={style.search_input}
                    placeholder="Search by title" />
            </div>
            <div className={style.content}>
                {isLouding ? (
                    <h2>Data is louding ...</h2>
                ) : (
                    collections.filter((obj: any) => obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
                        .map((obj: any, index) => (
                            <Collection key={index} name={obj.name} images={obj.photos} />))
                )}

            </div>
            <ul className={style.pagination}>
                {[...Array(5)].map((_, i) => (
                        <li onClick={() => setPage(i + 1)} className={page == i + 1 ? style.active : ''}>{i + 1}</li>
                    ))}
            </ul>
        </div>
    );
}

export default App;