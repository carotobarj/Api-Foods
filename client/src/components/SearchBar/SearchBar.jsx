import React from 'react';
import { useState  } from 'react';
import { useDispatch  } from 'react-redux';
import { cleanData, searchByName } from '../../actions';
import s from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInputChange (e){
    e.preventDefault();
    setName(e.target.value);
  
    } 

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchByName(name));
        dispatch(cleanData());
    }

    return (
        <div className={s.searchBar}>
            <input type = "text" placeholder = "Search by Name" onChange = {(e)=> handleInputChange(e)}/>
            <button onClick ={(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}