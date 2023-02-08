import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Comment.css';

export default function Comment() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newItem) return;
        console.log('submitted');

        addItem(newItem);
        setNewItem('');
    }

    const addItem = (comment) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;

        const getDate = new Date();
        const options = { //задаём формат вывода компонентов даты
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "numeric",
            minute: "numeric",
        }
        const date = getDate.toLocaleString("ru", options);

        const addedItem = { id: id, text: comment, date: date };
        items.push(addedItem);
        localStorage.setItem('comments', JSON.stringify(items)); //для localStorage: ключ=comments, значение=массив с объектами 
    }

    const handleChange = (event) => {
        setNewItem(event.target.value.trim())
    }

    useEffect(() => {
        let itemsFromStorage = JSON.parse(localStorage.getItem('comments')); //проверяем, есть ли в localStorage сохраненные значения
        console.log(itemsFromStorage);
        if (itemsFromStorage)
            setItems(itemsFromStorage)
    }, [])

    console.log('render');

    return (
        <section className="comments">
            <h3>Comments</h3>
            <div className="comments-list">
                {items.map((item) => <div className='new' key={item.id}><div className='date'>{item.date} </div>{item.text}</div>)}
            </div>
            <form className='form' onSubmit={handleSubmit}>
                <label className='input-label'>Add your comment
                    <textarea onChange={handleChange} type="text" className="input" rows="10"></textarea>
                </label>
                <button type="submit" className="send-btn">Send</button>
            </form>
        </section>

    )
}