import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Switch } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const ProductListing = (props) => {

  let Navigate = useNavigate()
  const { products, currentItems, currentPage, pageCount, itemsPerPage, search, paginate, onChange, handleDeleteProduct } = props;

  ProductListing.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      name: PropTypes.string.isRequired,
      product_code: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      // ... other properties
    })).isRequired,
    search: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    currentItems: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    handleDeleteProduct: PropTypes.func.isRequired,
  };






  

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr No
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Product Code
              </th>
              <th scope="col" className="px-6 py-3">
                Availability Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.products.filter((product) => {
              return props.search.toLowerCase() === '' ? product : product.name.toLowerCase().includes(props.search)
            }).map((product, index) => (
              <tr
                key={product.id}
                className={`border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'odd:bg-white even:bg-gray-50' : 'odd:dark:bg-gray-800 even:dark:bg-gray-700'}`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {(props.currentPage - 1) * props.itemsPerPage + index + 1}
                </th>
                <td className="px-6 py-4">
                  <img
                    alt={product.thumbnail}
                    src={`https://backend.hapspro.com/${product.thumbnail}`}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <a>{product.name}</a>
                </td>
                <td className="px-6 py-4 ">{product.product_code}</td>





                <td className="px-6 py-4">
                  <Switch checked={parseInt(product.status) === 1 ? true : false}
                    onChange={() => onChange(product)} className='bg-gray-500' />
                </td>
                <td className="px-6 py-4 text-right flex gap-2">
                  <button
                    onClick={() => Navigate({
                      pathname: "/product-update",
                      search: createSearchParams({
                        id: product.id,
                      }).toString()
                    })}
                    className="text-xl text-purple-700"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(index, product.id)}
                    className='text-xl text-red-700'
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex">
          {(props.currentPage === 1) ? '' : <button
            onClick={() => paginate(props.currentPage - 1)}
            className={`px-3 mx-3 rounded-md w-[110px] focus:outline-none bg-black text-white text-md ${props.currentPage === 1 ? 'cursor-not-allowed' : ''}`}
          // disabled={currentPage === 1}
          >
            Previous
          </button>}
          {(props.currentPage !== props.pageCount) ? <button
            onClick={() => paginate(props.currentPage + 1)}
            className={`px-3 mx-3 rounded-md w-[110px] focus:outline-none bg-black text-white text-md ${props.currentItems.length < props.itemsPerPage ? 'cursor-allowed' : ''}`}
          // disabled={currentItems.length < itemsPerPage}
          >
            Next
          </button> : ""}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductListing;
