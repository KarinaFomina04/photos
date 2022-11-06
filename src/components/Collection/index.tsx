import React from "react";
import style from './Collection.modules.scss'

const Collection: React.FC<any> = ({images, name}) => {
    return (
        <div className={style.collection}>
            <img className={style.collection__big} src={images[0]} alt="Item" />
            <div className={style.collection__bottom}>
                <img className={style.collection__mini} src={images[1]} alt="Item" />
                <img className={style.collection__mini} src={images[2]} alt="Item" />
                <img className={style.collection__mini} src={images[3]} alt="Item" />
            </div>
            <h4>{name}</h4>
        </div>
    )
}

export default Collection;