import React from "react";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange, showResult }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getPageNumbers();

    const handleClick = (e, page) => {
        e.preventDefault();
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="pagination-wrp">
            <ul>
                {/* Prev */}
                <li>
                    <a
                        href="#"
                        className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                        onClick={(e) => handleClick(e, currentPage - 1)}
                    >
                        <img src="/images/arrow-left.svg" alt="Prev" />
                    </a>
                </li>

                {/* First page + dots */}
                {/* {pages[0] > 1 && (
                    <>
                        <li>
                            <a href="#" className="num" onClick={(e) => handleClick(e, 1)}>
                                1
                            </a>
                        </li>
                        {pages[0] > 2 && <li className="dots">...</li>}
                    </>
                )} */}

                {/* Page numbers */}
                {pages.map((num) => (
                    <li key={num}>
                        <a
                            href="#"
                            className={`num ${num === currentPage ? "active" : ""}`}
                            onClick={(e) => handleClick(e, num)}
                        >
                            {num}
                        </a>
                    </li>
                ))}

                {/* Last page + dots */}
                {pages[pages.length - 1] < totalPages && (
                    <>
                        {pages[pages.length - 1] < totalPages - 1 && (
                            <li className="dots">...</li>
                        )}
                        <li>
                            <a
                                href="#"
                                className="num"
                                onClick={(e) => handleClick(e, totalPages)}
                            >
                                {totalPages}
                            </a>
                        </li>
                    </>
                )}

                {/* Next */}
                <li>
                    <a
                        href="#"
                        className={`next ${currentPage === totalPages ? "disabled" : ""}`}
                        onClick={(e) => handleClick(e, currentPage + 1)}
                    >
                        <img
                            src="/images/arrow-left.svg"
                            alt="Next"
                            style={{ transform: "rotate(180deg)" }}
                        />
                    </a>
                </li>
            </ul>
            {showResult && (
                <p>
                    Showing {startItem}–{endItem} of {totalItems} results
                </p>
            )}
        </div>
    );
};

export default React.memo(Pagination);
