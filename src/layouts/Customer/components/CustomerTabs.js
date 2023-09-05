import React, { useState } from 'react';
import { Tabs } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};




const CustomerTabs = () => {
    let [searchParam] = useSearchParams();

    const [customerOrders, setCustomerOrders] = useState([]);



    const getOrder = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch(`https://backend.hapspro.com/product/orders/getbycustomer/${searchParam.get("id")}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.warn(result)
                setCustomerOrders(result.orders)

            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getOrder();
    }, [])  


    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Customer Orders" key="1">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {/* Table content for Tab 1 */}
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Sr No
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Product Id
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Actual Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Discounted Percent
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Total Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Payment Method
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerOrders.map((orders, index) => {
                                    return (
                                        <tr
                                            key={orders.id}
                                            className={`border-b dark:bg-gray-800 dark:border-gray-700 `}
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-center"
                                            >
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4 text-center">
                                                {orders.products.map((productID) => {
                                                    return (
                                                        <>
                                                            <p>{productID.id}</p>
                                                        </>
                                                    );
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {orders.products.map((productID) => {
                                                    return (
                                                        <>
                                                            <p><a href={`http://192.168.1.14:3000/single-product/${productID.id}`} target='blank'>{productID.name}</a></p>
                                                        </>
                                                    );
                                                })}
                                            </td>
                                            <td className="px-6 py-4  text-center">
                                                {orders.products.map((productID) => {
                                                    return (
                                                        <>
                                                            <p>${parseInt(productID.actual_price)}/-</p>
                                                        </>
                                                    );
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                            {orders.products.map((productID) => {
                                                    return (
                                                        <>
                                                            <p>{parseInt(productID.discounted_percent)}%</p>
                                                        </>
                                                    );
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-center ">
                                                {orders.subtotal}
                                                {/* 12504 */}
                                            </td>
                                            <td className="px-6 py-4 text-center ">
                                                {orders.razorpay_order_id}
                                                {/* COD */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </TabPane>



                {/* tab  2 */}
                {/* <TabPane tab="Customer Transaction" key="2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        Table content for Tab 2
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Sr No
                                    </th>
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
                                {customer.map((el, index) => (
                                <tr
                                    key={el.id}
                                    className={`border-b dark:bg-gray-800 dark:border-gray-700 `}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                    >
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        <a>{el.name}</a>
                                        abc
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {el.email}
                                        email
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {el.mobile_no}
                                        mobile
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPane> */}


               
            </Tabs>
        </div>
    );
};

export default CustomerTabs;
