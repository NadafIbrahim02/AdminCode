// @mui material components
import Card from "@mui/material/Card";

// Arrange Free React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Arrange Free React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';



function ListCategory() {



    {/* let Navigate = useNavigate() */ }

    {/* const [customer, setCustomer] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);
const [customerDetails, setCustomerDetails] = useState(null);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = (indexOfFirstItem, indexOfLastItem); */}

const [list, setList] = useState([]);


// list categories
    const listHomeAppliances = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=a76a3d3rr6mqh4pgb0e59kt878qci8aa");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://backend.hapspro.com/admin/getHomeZoneAppliances", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
                setList(result.data)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        listHomeAppliances()
    }, [])



    // delete category
    const removeCategory = (index) => {
        const updatedCategories = list.filter((_, i) => i !== index);
        setList(updatedCategories);
      }
      const handleDeleteProduct = async (index, id) => {
        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow'
        };
    
        await fetch(`https://backend.hapspro.com/admin/deleteHomeZoneAppliances/${id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            // console.log(result);
            removeCategory(index);
          })
          .catch(error => console.log('error', error));
    
      };
    

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div>
                {/* {console.log(currentPage)} */}
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
                                {/* <th scope="col" className="px-6 py-3">
                                    Product Code
                                </th> */}
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((el, index) => (
                                <tr
                                    key={el.id}
                                    className={`border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'odd:bg-white even:bg-gray-50' : 'odd:dark:bg-gray-800 even:dark:bg-gray-700'}`}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                    >
                                        {/* {(currentPage - 1) * itemsPerPage + index + 1} */}
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        <img
                                            alt={el.image}
                                            src={`https://backend.hapspro.com/${el.image}`}
                                            className="w-[50px] h-[50px] rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <a>{el.title}</a>
                                    </td>
                                    {/* <td className="px-6 py-4 ">{product.product_code}</td> */}
                                    <td className="px-6 py-4 text-right flex gap-2">
                                        <button
                                            // onClick={() => Navigate({
                                            //     pathname: "/product-update",
                                            //     search: createSearchParams({
                                            //         id: product.id,
                                            //     }).toString()
                                            // })}
                                            className="AiFillEdit"
                                        >
                                            <AiFillEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(index, el.id)}
                                        >
                                            <AiOutlineDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="flex justify-center mt-4">
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
            className={`px-3 mx-3 rounded-md w-[110px] focus:outline-none bg-black text-white text-md ${currentItems.length < itemsPerPage ? 'cursor-allowed' : ''}`}
          // disabled={currentItems.length < itemsPerPage}
          >
            Next
          </button> : ""}

        </div>
      </div> */}
            </div>

            {/* <Footer /> */}
        </DashboardLayout>
    );
}

export default ListCategory;
