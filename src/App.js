import './App.scss';
import pages from './data/products.json'
import menuIcon from './images/menu_icon.svg';
import globeIcon from './images/globe.png';
import arrow from './images/arrow.png';
import swipe from './images/swipe.png';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

function App() {
    const [activePage, setActivePage] = useState(pages[0]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showMenu, setShowMenu] = useState(false);

    const handlers = useSwipeable({
        onSwipedLeft: () => turnPage('right'),
        onSwipedRight: () => turnPage('left'),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    function turnPage(direction) {
        if (direction === 'left') {
            if (currentPage === 0) return;
            setPage(currentPage - 1);
        } else if (direction === 'right') {
            if (currentPage === pages.length - 1) return;
            setPage(currentPage + 1);
        }
    }

    function setPage(number) {
        setActivePage(pages[number]);
        setCurrentPage(number);
    }

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <div className="wrapper" {...handlers}>
            <div className="inner-wrapper">
                {
                    showMenu ? <div className="menu">
                        <p onClick={() => toggleMenu()}>Затвори</p>
                    </div> : null
                }
                <header>
                    <img src={globeIcon} alt="Globe icon" />
                    <h3 className="title">МЕНЮ</h3>
                    <img src={menuIcon} onClick={() => toggleMenu()} alt="Menu icon" />
                </header>
                <div className="item-container">
                    {activePage.items.map((item) => {
                        return <div className='category' key={item.category}>
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
                    <img src={arrow} onClick={() => turnPage('left')} className="left-arrow" alt="Arrow icon" />
                    <img src={swipe} alt="Swipe indicator icon" />
                    <img src={arrow} onClick={() => turnPage('right')} alt="Arrow icon" />
                </div>
            </div>
        </div>
    );
}

export default App;
