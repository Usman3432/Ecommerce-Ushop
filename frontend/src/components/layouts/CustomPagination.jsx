import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, filterProdCount }) => {
    
    const page = Number(new URLSearchParams(window.location.search).get('page')) || 1;
    const [currentPage, setCurrentPage] = useState(page);

    let [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);

        if (searchParams.has('page')) {
            searchParams.set('page', pageNumber);
        } else {
            searchParams.append('page', pageNumber);
        }

        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
    };

    return (
        <div className='d-flex justify-content-center my-5'>
            {filterProdCount > resPerPage &&
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={filterProdCount}
                    onChange={setCurrentPageNo}
                    // Labels
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass='page-item'
                    linkClass='page-link'
                />
            }
        </div>
    );
}

export default CustomPagination
