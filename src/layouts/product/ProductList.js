// @mui material components
import Card from "@mui/material/Card";

// Arrange Free React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Arrange Free React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProductListing from "./components/ProductListing";
import { useEffect, useState } from "react";
// import Footer from "examples/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ProductList() {

  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const [pageCount, setPageCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Get All Products API
  const getAllProduct = async (page, latest) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    try {
      ([])
      const response = await fetch(`https://backend.hapspro.com/product/getProducts?page=${page}&latest=${latest}`, requestOptions);
      const result = await response.json();
      // console.log("Updated data", result.data.products);
      setProducts(result.data.products);
      setPageCount(result.data.page_count);
    } catch (error) {
      console.log('error', error);
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber <= pageCount || pageCount === null) { // Check if page count is reached or unknown
      setCurrentPage(pageNumber);
      getAllProduct(pageNumber, 1);
    }
  };

  const onLatest = (pageNumber) => {
    if (pageNumber <= pageCount || pageCount === null) { // Check if page count is reached or unknown
      setCurrentPage(pageNumber);
      getAllProduct(pageNumber, 1);
      setIsActive(!isActive);
    }
  };


  useEffect(() => {
    getAllProduct(currentPage);
  }, [currentPage]);



  // Get Product By ID
  const getProductById = async (productId) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    return fetch(`https://backend.hapspro.com/product/getProductById/${productId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        return result.data;
      })
      .catch(error => console.log('error', error));
  };



  // Delete Product
  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  }
  const handleDeleteProduct = async (index, productId) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    await fetch(`https://backend.hapspro.com/product/deleteProduct/${productId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        removeProduct(index);
      })
      .catch(error => console.log('error', error));

  };


  // PRODUCT STATUS API
  const onChange = async (product) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "status": parseInt(product.status) === 1 ? 0 : 1
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`https://backend.hapspro.com/product/updateProductStatus/${product.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === "success") {
          toast.success(`${product.name} ${parseInt(product.status) === 1 ? "Disabled" : "Enabled"}`, {
            theme: "light",
            autoClose: 1000
          })
        }
      })
      .catch(error => console.log('error', error));

    getAllProduct(currentPage)

  };





  return (
    <DashboardLayout>
      <div className="sticky top-0 z-10">
        <DashboardNavbar />
        <div className="bg-slate-50 flex flex-col-reverse md:flex-col-reverse lg:flex-row-reverse xl:flex-row-reverse justify-between items-center px-2 md:px-2 lg:px-14 xl:px-20 gap-5">
          <div className=" dark:bg-gray-800 mt-[12px] drop-shadow-lg w-[99%] md:w-[99%] lg:w-[70%] xl:w-[70%]">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." value={search} onChange={(e) => setSearch(e.target.value)} required />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 drop-shadow-lg">
            <button onClick={() => onLatest(currentPage)} className={` border p-1.5 rounded-full px-4 text-sm font-semibold ${isActive ? 'bg-black text-white' : 'bg-white text-black'
              }`}>
              latest </button>
            <button className="bg-white text-black border p-1.5 rounded-full px-3 text-sm font-semibold"> popular </button>
          </div>

        </div>
      </div>
      <div className="mt-8">
        <ProductListing products={products} currentPage={currentPage} pageCount={pageCount} currentItems={currentItems} search={search} itemsPerPage={itemsPerPage} paginate={paginate} onChange={onChange} handleDeleteProduct={handleDeleteProduct} />
      </div>
      <ToastContainer />
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default ProductList;
