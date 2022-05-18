import React from 'react';
import s from './PaginationRecipes.module.css';



export default function pagination({ allRecipes, pageSize, page, goToPreviousPage, goToNextPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allRecipes / pageSize); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <div className={s.pagination}>

                <button onClick={goToPreviousPage} className={s.btn}>Prev</button>

                {pageNumbers && pageNumbers.map(number => {
                    return (
                        <ul className='number' key={number}>
                            <button onClick={() => page(number)}>{number}</button>
                        </ul>
                    )
                })}
                <button onClick={goToNextPage} className={s.btn}>Next</button>
            </div>
        </nav>
    );
}
