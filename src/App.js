import './App.scss';
import pagesBG from './data/products.json'
import pagesEN from './data/productsEN.json'
import menuIcon from './images/menu_icon.svg';
import globeIcon from './images/globe.png';
import closeIcon from './images/close.png';
import bgFlagIcon from './images/flag.png';
import enFlagIcon from './images/united-kingdom.png';
import surfIcon from './images/surfing.png';
import arrow from './images/arrow.png';
import swipe from './images/swipe.png';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

function App() {
    const [pages, setPages] = useState(pagesBG);
    const [activePage, setActivePage] = useState(pages[0]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);
    const [english, setEnglish] = useState(false);

    useEffect(() => {
        const currentPageIndex = currentPage;
        if (currentPageIndex === 0) {
            setPage(1);
        } else {
            setPage(0);
        }
        setPage(currentPageIndex);

    }, [pages]);

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
    function toggleLanguageMenu() {
        setShowLanguage(!showLanguage);
    }

    function changeLanguage(change) {
        setEnglish(change);
        if (change) {
            setPages(pagesEN);
        } else {
            setPages(pagesBG);
        }
        toggleLanguageMenu();
    }

    function redirectToPage(number) {
        setPage(number - 1);
        toggleMenu();
    }

    return (
        <div className="wrapper" {...handlers}>
            <div className="inner-wrapper">
                {
                    showMenu ? <div className="menu">
                        <span onClick={() => toggleMenu()} className="close-btn"><img src={closeIcon} alt="Close icon" /></span>
                        <div className="categories-container">
                            {
                                pages.map(page => {
                                    return page.categories.map(category => {
                                        return <div onClick={() => redirectToPage(page.page)}
                                            className="category-item">
                                            <img src={surfIcon} className='surf-icon left-surf-icon' alt="surf-icon"/>
                                            <div className='line'></div>
                                            {category}
                                            <div className='line'></div>
                                            <img src={surfIcon} className='surf-icon right-surf-icon' alt="surf-icon"/>
                                        </div>
                                    })
                                })
                            }
                        </div>
                    </div> : null
                }
                {
                    showLanguage ? <div className="menu languages">
                        <span onClick={() => toggleLanguageMenu()} className="close-btn"><img src={closeIcon} alt="Close icon" /></span>
                        <div className="languages-container">
                            {
                                showLanguage ? <div className="language-menu">
                                    <div className="language-item" onClick={() => changeLanguage(false)}>
                                        <img src={bgFlagIcon} className='language-img' alt="bulgarian-flag"/>
                                        <a className='language'>Български</a>
                                    </div>
                                    <div className="language-item" onClick={() => changeLanguage(true)}>
                                        <img src={enFlagIcon} className='language-img' alt="english-flag"/>
                                        <a className='language'>English</a>
                                    </div>
                                </div> : null
                            }
                        </div>
                    </div> : null
                }
                <header>
                    <img src={globeIcon} alt="Globe icon" onClick={() => toggleLanguageMenu()} />
                    <h3 className="title">
                        {english ? 'MENU' : 'МЕНЮ'}
                    </h3>
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
                                            {product.price}{english ? 'lv.' : 'лв.'}
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
        </div >
    );
}

export default App;
