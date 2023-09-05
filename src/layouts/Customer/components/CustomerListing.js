import React, { useState, useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const CustomerListing = (props) => {

  let Navigate = useNavigate()
  const { customer, currentItems, currentPage, pageCount, itemsPerPage, search, paginate } = props;
  

  CustomerListing.propTypes = {
    customer: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,  
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobile_no: PropTypes.string.isRequired,
    })).isRequired,
    search: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number,
    currentItems: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
  };


  return (
    <div>
      {/* {console.log(currentPage)} */}
      
      
      <div className="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr No
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Image
              </th> */}
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile no.
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {customer.filter((el) => {
              return search.toLowerCase() === '' ? el : el.name.toLowerCase().includes(search)
            }).map((el, index) => (
              <tr
                key={el.id}
                className={`border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'odd:bg-white even:bg-gray-50' : 'odd:dark:bg-gray-800 even:dark:bg-gray-700'}`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </th>
                <td className="px-6 py-4">
                  <a>{el.name}</a>
                </td>
                <td className="px-6 py-4 ">{el.email}</td>
                <td className="px-6 py-4 ">{el.mobile_no}</td>

                <td className="px-6 py-4 text-right flex gap-2">
                  <button
                    onClick={() => Navigate({
                      pathname: "/customer-details",
                      search: createSearchParams({
                        id: el.id,
                      }).toString()
                    })}
                    className="bg-black text-white px-2 py-1 ml-1 rounded-sm text-xs"
                  >
                    View
                  </button>
                  {/* <AiOutlineDelete /> */}
                </td>
              </tr>
            ))}
          </tbody>  
        </table>
      </div>
      <div className="flex justify-center mt-4">
      <div className="flex">
          {(currentPage === 1) ? '' : <button
            onClick={() => paginate(currentPage - 1)}
            className={`px-3 mx-3 rounded-md w-[110px] focus:outline-none bg-black text-white text-md ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
          // disabled={currentPage === 1}
          >
            Previous
          </button>}
          {(currentPage !== pageCount) ? <button
            onClick={() => paginate(currentPage + 1)}
            // onClick={() => alert(currentPage)}
            className={`px-3 mx-3 rounded-md w-[110px] focus:outline-none bg-black text-white text-md ${currentItems.length < itemsPerPage ? 'cursor-allowed' : ''}`}
          // disabled={currentItems.length < itemsPerPage}
          >
            Next
          </button> : ""}

        </div>
      </div>
    </div>
  );
};

export default CustomerListing;
