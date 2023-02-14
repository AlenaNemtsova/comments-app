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

        addItem(newItem); //вызываем функцию добавления коммента и передаём, как параметр, новый коммент из поля ввода
        setNewItem(''); //очищает поле ввода после отправки сообщения
    }

    const addItem = (comment) => {
        const id = items.length ? items.length + 1 : 1; //определяем id для нового коммента

        const getDate = new Date();
        const options = { //задаём формат вывода компонентов даты
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "numeric",
            minute: "numeric",
        }
        const date = getDate.toLocaleString("ru", options); //определяем дату нового коммента

        const addedItem = { id: id, text: comment, date: date }; //сохраняем параметры добавленного коммента для хранилища
        // items.unshift(addedItem); //нельзя мутировать массив напрямую, 
        //поэтому создаём копию массива с комментариями:
        const newArr = [addedItem, ...items] //первый элемент – новый коммент, дальше все старые комменты 
        setItems(newArr); //в items кладём массив с новым комментом и сохраняем его в localStorage:
        localStorage.setItem('comments', JSON.stringify(newArr)); //для localStorage: ключ=comments, значение=массив с объектами 
    }

    const handleChange = (event) => {
        setNewItem(event.target.value) //отлавливаем изменения в поле при вводе с клавиатуры, меняем newItem
    }

    //при первом рендере страницы достаём сохранённые комменты из localStorage
    useEffect(() => {
        let itemsFromStorage = JSON.parse(localStorage.getItem('comments')); //обрабатываем сохранённое
        console.log(itemsFromStorage);
        if (itemsFromStorage) //проверяем, есть ли вообще в localStorage сохранённые значения
            setItems(itemsFromStorage) //в items (массив с комментами), кладём все значения из localStorage, чтобы затем отрисовать items.map()
    }, [])

    console.log('render');

    return (
        <section className="comments">
            <h3>Comments</h3>
            <div className="comments-list">
                {items.map((item) => <div className='new' key={item.id}><div className='date'>{item.date}</div>{item.text}</div>)}
            </div>
            <form className='form' onSubmit={handleSubmit}>
                <label className='input-label'>Add your comment
                    <textarea onChange={handleChange} value={newItem} type="text" className="input" rows="10"></textarea>
                    {/* у textarea не забыть указать value!!!, которое будет очищаться setNewItem('');  */}
                </label>
                <button type="submit" className="send-btn">Send</button>
            </form>
        </section>

    )
}