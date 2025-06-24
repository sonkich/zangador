import './App.scss';
import pages from './data/products.json'
import menuIcon from './images/menu_icon.svg';
import globeIcon from './images/globe.png';
import arrow from './images/arrow.png';
import swipe from './images/swipe.png';
import { useState } from 'react';

function App() {
    const [activePage, setActivePage] = useState(pages[0]);
    const [currentPage, setCurrentPage] = useState(0);
    let touchStart = 0;

    window.addEventListener('touchstart', (e) => {
        touchStart = e.targetTouches[0].clientX;
        console.log(e);
    });

    window.addEventListener('touchend', (e) => {
        let touchEnd = e.changedTouches[0].clientX;
        console.log(e);

        if (touchStart > touchEnd) {
            if (currentPage === pages.length - 1) return;
            setActivePage(pages[currentPage + 1]);
            setCurrentPage(currentPage + 1);
        } else if (touchStart < touchEnd) {
            if (currentPage === 0) return;
            setActivePage(pages[currentPage - 1]);
            setCurrentPage(currentPage - 1);
        }
        return
    })

    return (
        <div className="wrapper">
            <div className="inner-wrapper">
                <header>
                    <img src={globeIcon} alt="Globe icon" />
                    <h3 className="title">МЕНЮ</h3>
                    <img src={menuIcon} alt="Menu icon" />
                </header>
                <div className="menu">
                    {activePage.items.map((item) => {
                        return <div className="category">
                            <p className="category-title">{item.category}</p>
                            {
                                item.products.map(product => {
                                    return <div className="product">
                                        <div className="product-name">
                                            <p>{product.name} - <span>{product.volume}</span></p>
                                            {product.ingredients &&
                                                <p className="ingredients">{product.ingredients}</p>
                                            }
                                        </div>
                                        <div className="price">
                                            {product.price}лв.
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    })}
                </div>
                <div className="actions">
                    <img src={arrow} onClick={() => {
                        if (currentPage === 0) return;
                        setActivePage(pages[currentPage - 1]);
                        setCurrentPage(currentPage - 1);
                    }}
                        className="left-arrow" alt="Arrow icon" />
                    <img src={swipe} alt="Swipe indicator icon" />
                    <img src={arrow} onClick={() => {
                        if (currentPage === pages.length - 1) return;
                        setActivePage(pages[currentPage + 1]);
                        setCurrentPage(currentPage + 1);
                    }} alt="Arrow icon" />
                </div>
            </div>
        </div>
    );
}

export default App;
