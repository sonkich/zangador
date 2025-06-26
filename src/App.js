import './App.scss';
import pages from './data/products.json'
import menuIcon from './images/menu_icon.svg';
import globeIcon from './images/globe.png';
import closeIcon from './images/close.png';
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
    function findPage(category) {
        setActivePage(pages.find(page => page.categories.includes(category)));
        toggleMenu();
    }
    return (
        <div className="wrapper" {...handlers}>
            <div className="inner-wrapper">
                {
                    showMenu ? <div className="menu">
                        <p onClick={() => toggleMenu()} className="close-btn"><img src={closeIcon} alt="Close icon" /></p>
                        <div className="categories-container">
                            {
                                pages.map(page => {
                                    return page.categories.map(category => {
                                        return <p onClick={() => findPage(category)} class="category-item" type="button" name={category}>{category}</p>
                                    })
                                })
                            }
                        </div>

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




// import './App.scss';
// import pages from './data/products.json'
// import menuIcon from './images/menu_icon.svg';
// import globeIcon from './images/globe.png';
// import arrow from './images/arrow.png';
// import swipe from './images/swipe.png';
// import { useState } from 'react';
// []

// function App() {
//     const [activePage, setActivePage] = useState(pages[0]);
//     const [currentPage, setCurrentPage] = useState(0);

//     let categoriesArr = [];
//     pages.forEach(page => categoriesArr.push(...page.categories));

//     document.addEventListener('touchstart', handleTouchStart, false);
//     document.addEventListener('touchmove', handleTouchMove, false);

//     let xDown = null;

//     function getTouches(evt) {
//         return evt.touches || evt.originalEvent.touches;
//     }

//     function handleTouchStart(evt) {
//         const firstTouch = getTouches(evt)[0];
//         xDown = firstTouch.clientX;
//     };

//     function handleTouchMove(evt) {
//         if (!xDown) {
//             return;
//         }

//         let xUp = evt.touches[0].clientX;
//         let xDiff = xDown - xUp;

//         if (xDiff > 5) {
//             turnPage('right');
//         } else if (xDiff < -5) {
//             turnPage('left')
//         }

//         xDown = null;
//     };

//     function turnPage(direction) {
//         if (direction === 'left') {
//             if (currentPage === 0) return;
//             setActivePage(pages[currentPage - 1]);
//             setCurrentPage(currentPage - 1);
//         } else if (direction === 'right') {
//             if (currentPage === pages.length - 1) return;
//             setActivePage(pages[currentPage + 1]);
//             setCurrentPage(currentPage + 1);
//         }

//     }

//     function findPage(category) {
//         setActivePage(pages.find(page => page.categories.includes(category)));
//     }

//     return (
//         <div className="wrapper">
//             <div className="inner-wrapper">
//                 <header>
//                     <img src={globeIcon} alt="Globe icon" />
//                     <h3 className="title">МЕНЮ</h3>
//                     <div class="btn-group">
//                         <button type="Dropdown" class="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
//                             <img src={menuIcon} alt="Menu icon" />
//                         </button>
//                         <div class="dropdown-menu dropdown-menu-right">
//                             {
//                                 categoriesArr.map(category => {
//                                     return <button onClick={() => findPage(category)} class="dropdown-item" type="button" name={category}>{category}</button>
//                                 })
//                             }
//                         </div>
//                     </div>
//                 </header>
//                 <div className="menu">
//                     {activePage.items.map((item) => {
//                         return <div className="category">
//                             <p className="category-title">{item.category}</p>
//                             {
//                                 item.products.map(product => {
//                                     return <div className="product">
//                                         <div className="product-name">
//                                             <p>{product.name} - <span>{product.volume}</span></p>
//                                             {product.ingredients &&
//                                                 <p className="ingredients">{product.ingredients}</p>
//                                             }
//                                         </div>
//                                         <div className="price">
//                                             {product.price}лв.
//                                         </div>
//                                     </div>
//                                 })
//                             }
//                         </div>
//                     })}
//                 </div>
//                 <div className="actions">
//                     <img src={arrow} onClick={() => turnPage('left')} className="left-arrow" alt="Arrow icon" />
//                     <img src={swipe} alt="Swipe indicator icon" />
//                     <img src={arrow} onClick={() => turnPage('right')} alt="Arrow icon" />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default App;
