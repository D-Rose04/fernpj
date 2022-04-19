import React from 'react'
import { v4 as uuid } from 'uuid';
export default function ImageList({ images }) {
    return (
        <div>
            {images!== undefined? images.map((img) => <img className='img' key={uuid()} src={`${img}`} alt={img}></img>): "no images" }
        </div>
    )
}
