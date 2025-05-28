import React, { useEffect, useRef, useState } from 'react';
import GlobalApi from '../Services/GlobalApi';
import MovieCard from './MovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import HrMovieCard from './HrMovieCard';

function MovieList({ genreId, index_ }) {
    const [movieList, setMovieList] = useState([]);
    const elementRef = useRef(null);

    useEffect(() => {
        getMovieByGenreId();
    }, []);

    const getMovieByGenreId = () => {
        GlobalApi.getMovieByGenreId(genreId).then(resp => {
            setMovieList(resp.data.results);
        });
    };

    const slideRight = (element) => {
        const cardWidth = window.innerWidth >= 768 ? 230 : 200;
        const gap = 32;
        const paddingLeft = 12; // pl-3
        const paddingRight = 0; // pr-0
        const scrollbarWidth = 15;
        const arrowWidth = 66;
        const arrowOffset = 90; // right-[-90px]
        const viewportWidth = window.innerWidth - scrollbarWidth; // 1905px
        const visibleWidth = viewportWidth - paddingLeft - paddingRight - arrowWidth - arrowOffset; // 1905 - 12 - 0 - 66 - 90 = 1737px
        const cardsPerView = Math.floor(visibleWidth / (cardWidth + gap));
        const scrollAmount = cardsPerView * (cardWidth + gap);
        element.scrollLeft += scrollAmount;

        const totalContentWidth = (movieList.length * cardWidth) + ((movieList.length - 1) * gap);
        const maxVisibleEdge = viewportWidth - arrowWidth - arrowOffset - paddingRight; // 1905 - 66 - 90 - 0 = 1749px
        if (element.scrollLeft + visibleWidth + arrowWidth + arrowOffset > totalContentWidth) {
            element.scrollLeft = totalContentWidth - maxVisibleEdge;
        }
    };

    const slideLeft = (element) => {
        const cardWidth = window.innerWidth >= 768 ? 230 : 200;
        const gap = 32;
        const paddingLeft = 12;
        const paddingRight = 0;
        const scrollbarWidth = 15;
        const arrowWidth = 66;
        const arrowOffset = 90;
        const viewportWidth = window.innerWidth - scrollbarWidth;
        const visibleWidth = viewportWidth - paddingLeft - paddingRight - arrowWidth - arrowOffset;
        const cardsPerView = Math.floor(visibleWidth / (cardWidth + gap));
        const scrollAmount = cardsPerView * (cardWidth + gap);
        element.scrollLeft -= scrollAmount;

        if (element.scrollLeft < 0) {
            element.scrollLeft = 0;
        }
    };

    return (
        <div className="relative w-vw-adjusted">
            <IoChevronBackOutline
                onClick={() => slideLeft(elementRef.current)}
                className={`text-[50px] text-white p-2 z-10 cursor-pointer 
                 hidden md:block absolute left-0
                 ${index_ % 3 == 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
            />
            <div
                ref={elementRef}
                className='flex w-vw-adjusted overflow-x-auto gap-8
                 scrollbar-none no-scrollbar scroll-smooth pt-4 pl-3 pr-0 pb-4'
            >
                {movieList.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {index_ % 3 === 0 ? (
                            <HrMovieCard movie={item} className="w-[200px] md:w-[230px] flex-shrink-0" />
                        ) : (
                            <MovieCard movie={item} className="w-[200px] md:w-[230px] flex-shrink-0" />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <IoChevronForwardOutline
                onClick={() => slideRight(elementRef.current)}
                className={`text-[50px] text-white hidden md:block
                p-2 cursor-pointer z-10 top-0
                 absolute right-[-90px]
                ${index_ % 3 == 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
            />
        </div>
    );
}

export default MovieList;