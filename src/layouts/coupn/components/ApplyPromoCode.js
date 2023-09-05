import React, { useState } from 'react'
import { Select } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
let index = 0;


const { Option } = Select;

const ApplyPromoCode = () => {

  const [items, setItems] = useState(['Percent', 'Amount', 'Services']);
  const [selectedItem, setSelectedItem] = useState('');
  const [CouponType, setCouponType] = useState(['Shopkeeper', 'Channel Partner', 'Area', 'Universal']);
  const [selectedType, setSelectedType] = useState('');
  // const [inputValue, setInputValue] = useState('');
  const [percentValue, setPercentValue] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [servicesValue, setServicesValue] = useState('');
  const [shopkeeperValue, setShopkeeperValue] = useState('');
  const [channelPartnerValue, setChannelPartnerValue] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [universalValue, setUniversalValue] = useState('');

  const handleItemSelection = (selectedItem) => {
    setSelectedItem(selectedItem);
    // setInputValue(''); // Reset the input value when a new item is selected
  };

  const handleTypeSelection = (selectedType) => {
    setSelectedType(selectedType);
  };

  const [CouponData, setCouponData] = useState([]);

  const handleAddTerms = (e) => {
    e.preventDefault();
    setCouponData([...CouponData, ""]);
  };

  const handleRemoveterms = (index) => {
    const updatedFields = [...CouponData];
    updatedFields.splice(index, 1);
    setCouponData(updatedFields);
  };

  const handleChangeTerms = (index, event) => {
    const updatedFields = [...CouponData];
    updatedFields[index] = event.target.value;
    setCouponData(updatedFields);
  };



  return (
    <div className="w-full  mx-auto p-4 bg-white rounded-md shadow-md text-sm">
      <div className='grid grid-cols-2 gap-4'>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Coupon Category
          </label>
          <Select
            className='w-full '
            placeholder="Select Coupon Type"
            dropdownRender={(menu) => <>{menu}</>}
            options={CouponType.map((item) => ({
              label: item,
              value: item,
            }))}
            onChange={(selectedValue) => handleTypeSelection(selectedValue)}
            mode="multiple" 
          />
        </div>

        {selectedType === '' && (
          <div className="mb-4">
            <label htmlFor="percentage" className="block text-gray-700 font-semibold mb-2">
              Coupon Category Name
            </label>
            <input
              type="" 
              value="" 
              // onClick={(e) => e.preventDefault()}
              // disabled={selectedType === ''}
              placeholder=""
              className="w-full mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
        )}

        {selectedType.includes('Shopkeeper') && (
          <div className="mb-4">
            <label htmlFor="shopkeeper" className="block text-gray-700 font-semibold mb-2">
              Shopkeeper
            </label>
            <input
              type="text"
              value={shopkeeperValue}
              onChange={(e) => setShopkeeperValue(e.target.value)}
              placeholder="Enter shopkeeper"
              className="w-full mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
        )}

        {selectedType.includes('Channel Partner') && (
          <div className="mb-4">
            <label htmlFor="channelPartner" className="block text-gray-700 font-semibold mb-2">
              Channel Partner
            </label>
            <input
              type="text"
              value={channelPartnerValue}
              onChange={(e) => setChannelPartnerValue(e.target.value)}
              placeholder="Enter channel partner"
              className="w-full mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
        )}

        {selectedType.includes('Area') && (
          <div className="mb-4">
            <label htmlFor="channelPartner" className="block text-gray-700 font-semibold mb-2">
              Area
            </label>
            <input
              type="text"
              value={areaValue}
              onChange={(e) => setAreaValue(e.target.value)}
              placeholder="Enter area pincode"
              className="w-full mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
        )}

        {selectedType.includes('Universal') && (
          <div className="mb-4">
            <label htmlFor="channelPartner" className="block text-gray-700 font-semibold mb-2">
            Universal
            </label>
            <input
              type="text"
              value={universalValue}
              onChange={(e) => setUniversalValue(e.target.value)}
              placeholder="Enter channel partner"
              className="w-full mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
        )}




        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Coupon Type
          </label>
          <Select
            className='w-full '
            placeholder="Select Coupon Type"
            dropdownRender={(menu) => <>{menu}</>}
            options={items.map((item) => ({
              label: item,
              value: item,
            }))}
            onChange={(selectedValue) => handleItemSelection(selectedValue)}
          />
        </div>

        {selectedItem === '' && (
          <div className="mb-4">
            <label htmlFor="percentage" className="block text-gray-700 font-semibold mb-2">
              Coupon Type Name
            </label>
            <input
              type="" 
              value="" 
              onClick={(e) => e.preventDefault()}
              disabled={selectedItem === ''}
              placeholder=""
              className="w-full mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
        )}

        {selectedItem === 'Percent' && (
          <div className="mb-4">
            <label htmlFor="percentage" className="block text-gray-700 font-semibold mb-2">
              Percentage
            </label>
            <input
              type="text"
              value={percentValue}
              onChange={(e) => setPercentValue(e.target.value)}
              placeholder="Enter percentage"
              className="w-full mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
        )}

        {selectedItem === 'Amount' && (
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
              Amount
            </label>
            <input
              type="text"
              value={amountValue}
              onChange={(e) => setAmountValue(e.target.value)}
              placeholder="Enter amount"
              className="w-full mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
        )}

        {selectedItem === 'Services' && (
          <div className="mb-4">
            <label htmlFor="services" className="block text-gray-700 font-semibold mb-2">
              Services
            </label>
            <input
              type="text"
              value={servicesValue}
              onChange={(e) => setServicesValue(e.target.value)}
              placeholder="Enter services"
              className="w-full mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
        )}



        <div className="mt-4">
          <label htmlFor="productName" className="block text-gray-700 font-semibold ">
            Coupon Name
          </label>  
          <input
            type="text"
            id=""
            name=""
            placeholder='Enter Coupon name'
            //   value={productBrand}
            //   onChange={(e) => setProductBrand(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="productName" className="block text-gray-700 font-semibold ">
            Coupon Code
          </label>
          <input
            type="text"
            id=""
            name=""
            placeholder='Enter Coupon code'
            //   value={productBrand}
            //   onChange={(e) => setProductBrand(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
          />
        </div>

        <div className="my-4">
          <label htmlFor="productName" className="block text-gray-700 font-semibold ">
            Coupon Expiry
          </label>
          <input
            type="text"
            id=""
            name=""
            placeholder='Enter Coupon Expiry'
            //   value={productBrand}
            //   onChange={(e) => setProductBrand(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
          />
        </div>

        <div className="my-4">
          <label htmlFor="productName" className="block text-gray-700 font-semibold ">
            Cart Minimun Amount
          </label>
          <input
            type="text"
            id=""
            name=""
            placeholder='Enter minimum amount'
            //   value={productBrand}
            //   onChange={(e) => setProductBrand(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
          />
        </div>

        <div className="my-4">
          <label htmlFor="productName" className="block text-gray-700 font-semibold ">
            Usage Limit
          </label>
          <input
            type="text"
            id=""
            name=""
            placeholder='Enter Usage limit'
            //   value={productBrand}
            //   onChange={(e) => setProductBrand(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
          />
        </div>

        <div className="my-4">
          <label htmlFor="productName" className="block text-gray-700 font-semibold ">
            Per User Limit
          </label>
          <input
            type="text"
            id=""
            name=""
            placeholder='Enter per user limit'
            //   value={productBrand}
            //   onChange={(e) => setProductBrand(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-xs"
          />
        </div>
      </div>

      {/* Add Field Section */}
      <div className='mt-8'>
        <div className=''>
          <button
            onClick={handleAddTerms}
            className="bg-gray-50 text-sm p-2 rounded-lg border-2 w-full border-dotted my-4 flex justify-center gap-2 items-center"
          >
            Add Terms And Condition
            <span>
              <AiOutlinePlus className="text-black" />
            </span>
          </button>
          {CouponData.map((input, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                className="bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={input}
                placeholder="write terms and condition..."
                onChange={(event) => handleChangeTerms(index, event)}
              />
              <RxCross2
                className="text-red-500 cursor-pointer"
                onClick={() => handleRemoveterms(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-black hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          // onClick={handleSubmit}
        >
          Submit
        </button>

    </div>
  )
}

export default ApplyPromoCode