import React from "react";
import style from './App.modules.scss'
import Collection from '../Collection';


function App() {
    const [searchValue, setsearchValue] = React.useState([]);
    const [collections, setCollections] = React.useState([]);
    React.useEffect(() => {
        fetch('https://6366ecd1f5f549f052ce631b.mockapi.io/photos')
            .then((res) => res.json())
            .then((json) => {
                setCollections(json);
            })
            .catch(err => {
                console.warn(err);
                alert('Ошибка при получение данных');
            });
    }, []);

    return (
        <div className={style.App}>
            <h1>Моя коллекция фотографий</h1>
            <div className={style.top}>
                <ul className={style.tags}>
                    <li className={style.active}>Все</li>
                    <li>Горы</li>
                    <li>Море</li>
                    <li>Архитектура</li>
                    <li>Города</li>
                </ul>
                <input className={style.search_input} placeholder="Поиск по названию" />
            </div>
            <div className={style.content}>
                {collections.map((obj: any, index) => (
                    <Collection key={index} name={obj.name} images={obj.photos}/>
                ))}

            </div>
            <ul className={style.pagination}>
                <li>1</li>
                <li className={style.active}>2</li>
                <li>3</li>
            </ul>
        </div>
    );
}

export default App;