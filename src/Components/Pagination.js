import React from "react";

const Pagination = (props) => {
  const { currentPage, totalPages, onPageChange } = props;
  const pageNumbersToShow = 6; // Number of page numbers to display at a time

  // Function to handle previous and next page clicks
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const halfPageNumbersToShow = Math.floor(pageNumbersToShow / 2);

    let startPage;
    let endPage;

    if (totalPages <= pageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfPageNumbersToShow) {
      startPage = 1;
      endPage = pageNumbersToShow;
    } else if (currentPage >= totalPages - halfPageNumbersToShow) {
      startPage = totalPages - pageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPageNumbersToShow;
      endPage = currentPage + halfPageNumbersToShow;
    }

    if (startPage > 1) {
      pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      pageNumbers.push("...");
    }

    return pageNumbers;
  };

  return (
    <>
      {" "}
      <nav className="flex justify-center items-center space-x-2">
        <a
          className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
          href="#"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </a>

        {getPageNumbers().map((page, index) => (
          <a
            key={index}
            className={`w-10 h-10 ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-blue-600"
            } p-4 inline-flex items-center text-sm font-medium rounded-full`}
            href="#"
            onClick={() => {
              if (typeof page === "number") {
                onPageChange(page);
              }
            }}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </a>
        ))}

        <a
          className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
          href="#"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </a>
      </nav>
    </>
  );
};

export default Pagination;
