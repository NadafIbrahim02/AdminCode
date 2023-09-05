import React, { useState, useEffect, useRef } from 'react';
import { Tabs } from 'antd';
import { Select } from 'antd';
import "./ProductForm.css"
import { Modal, Upload } from 'antd';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const { Option } = Select;
const { TabPane } = Tabs;

const items = [
  { key: '1', title: 'Channel Partner', name: 'properties' },
  { key: '2', title: 'Features', name: 'features' },
  { key: '3', title: 'Care And Instructions', name: 'care_n_instructions' },
  { key: '4', title: 'Warranty', name: 'warranty_details' },
  { key: '5', title: 'Quality Promise', name: 'quality_promise' },
];



const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const ProductForm = () => {


  const [features, setFeatures] = useState('');
  const [properties, setProperties] = useState('');
  const [careAndInstructions, setCareAndInstructions] = useState('');
  const [warrantyDetails, setWarrantyDetails] = useState('');
  const [qualityPromise, setQualityPromise] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productHeight, setProductHeight] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productWarranty, setProductWarranty] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productStorage, setProductStorage] = useState('');
  const [productPhoto, setProductPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);

  const [imageSources, setImageSources] = useState([]);
  const appendImage = (image) => {
    // console.log('asdfff', image);
    image.image_index = imagesArray.length;
    imagesArray.push(image);
    var imagePath = image.path_900x500;
    const newImageSource = 'https://backend.hapspro.com/' + imagePath; // Replace "image.jpg" with the actual source of the new image
    setImageSources(prevSources => [...prevSources, newImageSource]);
  };

  const removeItem = (index) => {
    const updatedImageSources = imageSources.filter((_, i) => i !== index);
    setImageSources(updatedImageSources);
    const updatedImagesArray = imagesArray.filter((_, i) => i !== index);
    setImagesArray(updatedImagesArray);
  };



  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  const [customFormData, setCustomFormData] = useState([]);

  const handleAddField = () => {
    setCustomFormData([...customFormData, { title: '', value: '' }]);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFormData = [...customFormData];
    updatedFormData[index][field] = value;
    setCustomFormData(updatedFormData);
  };



  const handleCustomFeildChange = (index, field, value) => {
    // Handle the field change logic here
    switch (field) {
      case 'features':
        // console.log('Features:', value);
        setFeatures(value);
        break;
      case 'properties':
        // console.log('Properties:', value);
        setProperties(value);
        break;
      case 'care_n_instructions':
        // console.log('Care and Instructions:', value);
        setCareAndInstructions(value);
        break;
      case 'warranty_details':
        // console.log('Warranty Details:', value);
        setWarrantyDetails(value);
        break;
      case 'quality_promise':
        // console.log('Quality Promise:', value);
        setQualityPromise(value);
        break;
      default:
        break;
    }
  };

  const handleDeleteField = (index) => {
    const updatedFormData = [...customFormData];
    updatedFormData.splice(index, 1);
    setCustomFormData(updatedFormData);
  };



  const handleCategoryChange = (event) => {
    // alert(event);
    setSelectedCategory(event);
  };



  const handleFileChange = (e) => {
    const files = e.target.files;
    const selectedFiles = Array.from(files);
    setSelectedFiles(selectedFiles);

    const deleteFile = (index) => {
      const updatedFiles = [...selectedFiles];
      updatedFiles.splice(index, 1);
      setSelectedFiles(updatedFiles);

      const updatedPreviewImages = [...previewImages];
      updatedPreviewImages.splice(index, 1);
      setPreviewImages(updatedPreviewImages);
    };


    const previewImages = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        previewImages.push(reader.result);
        if (previewImages.length === selectedFiles.length) {
          setPreviewImages(previewImages);
        }
      };

      reader.readAsDataURL(file);
    }
  };






  // 
  // Get Categories API
  // 
  useEffect(() => {
    const getData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        const response = await fetch("https://backend.hapspro.com/admin/getHomeZoneAppliances", requestOptions);
        const result = await response.json();
        setCategories(result.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    getData();
  }, []);




  // 
  // Uploada Image API
  // 
  const imageUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formdata = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formdata.append("image_path", selectedFiles[i]);
    }
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    await fetch("https://backend.hapspro.com/product/createProductImage", requestOptions)
      .then(response => response.text())
      // .then(result => console.log('ima',result))
      .then(result => {
        appendImage(JSON.parse(result).data);
        // appendImage(result.data);
        if (inputFileRef.current) {
          inputFileRef.current.value = null;
          selectedFiles[0] = undefined;

          // inputFileRef.current= null;
        }
      }
      )
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoading(false);
      });
  };





  // 
  // Delete Image API
  // 
  const deleteImage = async (index) => {
    console.log(index);
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...previewImages];

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "image_path": {
          "path_900x500": "public/uploads/products/900x500/36dd95dfe54b6ef1fcf91684495235.jpeg",
          "path_128x128": "public/uploads/products/128x128/36dd95dfe54b6ef1fcf91684495235.jpeg"
        }
      });

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch("https://backend.hapspro.com/product/deleteProductImage", requestOptions)
        .then(response => response.text())
        .then(result => {
          // console.log(result);
          removeItem(index);
          // console.log(imagesArray);
        })
        .catch(error => console.log('error', error));

      updatedFiles.splice(index, 1);
      updatedPreviews.splice(index, 1);
      setSelectedFiles(updatedFiles);
      setPreviewImages(updatedPreviews);
      if (inputFileRef.current) {
        inputFileRef.current.value = null; // Clear the input field
      }
    } catch (error) {
      // Handle error if the API request fails
      console.error('Failed to delete product:', error);
      // Display an error message to the user or perform any necessary error handling
    }
  };




  // 
  // Create Product API
  // 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('home_zone_appliances_id', selectedCategory);
    formData.append('name', productName);
    formData.append('brand', productBrand);
    formData.append('height', productHeight);
    formData.append('size', productSize);
    formData.append('warranty', productWarranty);
    formData.append('actual_price', actualPrice);
    formData.append('product_code', productCode);
    formData.append('features', features);
    formData.append('properties', properties);
    formData.append('care_n_instructions', careAndInstructions);
    formData.append('warranty_details', warrantyDetails);
    formData.append('quality_promise', qualityPromise);


    formData.append('custom_fields', JSON.stringify(customFormData))
    var newTemp = JSON.stringify(imagesArray);
    console.log('sdffdsfsdfsadfdsf', imagesArray);
    formData.append('images_path', newTemp);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ' - ' + pair[1]);
    }

    try {
      const requestOptions = {
        method: 'POST',
        body: formData,
      };

      const response = await fetch(
        'https://backend.hapspro.com/product/createProduct',
        requestOptions
      );
      const result = await response.json();
      if (result.success) {

        setSelectedCategory('');
        setProductName('');
        setProductBrand('');
        setProductHeight('');
        setProductSize('');
        setProductWarranty('');
        setActualPrice('');
        setDiscountedPrice('');
        setProductCode('');
        setProductStorage('');
        setFeatures('');
        setProperties('');
        setCareAndInstructions('');
        setWarrantyDetails('');
        setQualityPromise('');
        setProductPhoto(null);
        setImageSources([]);
        setSelectedFiles([]);
        setPreviewImages([]);
      }
      if (result.status === 200) {
        toast.success("Product added successfully", {
          theme: "light",
          autoClose: "2000",
        });
      }
      else {
        // message.error('Failed to create product');
      }
    } catch (error) {
      console.log('Error creating product:', error);
    }
  };




  // drag n drop
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = () => {
    console.log('current index', dragItem.current);
    const copyImageSources = [...imageSources];
    const dragItemContent = copyImageSources[dragItem.current];
    copyImageSources.splice(dragItem.current, 1);
    copyImageSources.splice(dragOverItem.current, 0, dragItemContent);
    var currentIndex = dragItem.current;
    var dropIndex = dragOverItem.current;
    setImageSources(copyImageSources);
    imagesArray[currentIndex].image_index = dropIndex;
    if(dropIndex < currentIndex)
    {
      while(dropIndex != currentIndex) 
      {
        imagesArray[dropIndex].image_index = ++dropIndex;
      }
    }
    else {
      while(dropIndex != currentIndex) 
      {
        imagesArray[dropIndex].image_index = --dropIndex;
      }
    }

    const copyImageArray = [...imagesArray];
    const dragImageContent = copyImageArray[dragItem.current];
    copyImageArray.splice(dragItem.current, 1);
    copyImageArray.splice(dragOverItem.current, 0, dragImageContent);
    setImagesArray(copyImageArray);
    
    currentIndex = dropIndex = 0;

    dragItem.current = null;
    dragOverItem.current = null;

    // Update imagesarray
    // const copyImagesArray = [...imagesArray];
    
  };
  
  console.log('Images', imagesArray);

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-md shadow-md text-sm">
      {/* {console.log(customFormData)} */}
      <div className='p-4'>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Product Category
          </label>
          <Select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full"
          >
            {!selectedCategory && (
              <Option value="" disabled>
                Select Category
              </Option>
            )}
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.title}
              </Option>
            ))}
          </Select>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className="">
            <label htmlFor="productName" className="block text-gray-700 font-semibold ">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder='Enter product name'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>

          <div className="">
            <label htmlFor="productName" className="block text-gray-700 font-semibold ">
              Product Brand
            </label>
            <input
              type="text"
              id="productBrand"
              name="productBrand"
              placeholder='Enter product brand'
              value={productBrand}
              onChange={(e) => setProductBrand(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>

          <div className="">
            <label htmlFor="productName" className="block text-gray-700 font-semibold ">
              Product Warranty
            </label>
            <input
              type="text"
              id="productWarranty"
              name="productWarranty"
              placeholder='Enter product Warranty'
              value={productWarranty}
              onChange={(e) => setProductWarranty(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
          <div className="">
            <label htmlFor="productActualPrice" className="block text-gray-700 font-semibold ">
              Actual Price
            </label>
            <input
              type="number"
              id="actualPrice"
              name="actualPrice"
              placeholder='Enter Actual Price'
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
          <div className="">
            <label htmlFor="productName" className="block text-gray-700 font-semibold ">
              Product Height
            </label>
            <input
              type="text"
              id="productHeight"
              name="productHeight"
              placeholder='Enter product height'
              value={productHeight}
              onChange={(e) => setProductHeight(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
          <div className="">
            <label htmlFor="productName" className="block text-gray-700 font-semibold ">
              Product Code
            </label>
            <input
              type="text"
              id="productCode"
              name="productCode"
              placeholder='Enter product code'
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs"
            />
          </div>
          <div className="">
            <label htmlFor="productSize" className="block text-gray-700 font-semibold">
              Product Size
            </label>
            <div className="flex">
              <input
                type="text"
                id="productSize"
                name="productSize"
                placeholder="Enter product Size"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* <span className="ml-4">mm</span> */}
            </div>
          </div>

          {/* <div className="">
            <label htmlFor="productSize" className="block text-gray-700 font-semibold">
              Discount Percent
            </label>
            <div className="flex">
              <input
                type="text"
                id=""
                name=""
                placeholder="Enter product Size"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-4">mm</span>
            </div>
          </div> */}


        </div>
        <div className='mt-8'>
          <div className='mb-4'>
            <button onClick={handleAddField} className='bg-gray-50 text-sm p-2 rounded-lg border-2 w-full border-dotted my-4 flex justify-center gap-2 items-center'>Add New Feild</button>
            {customFormData.map((field, index) => (
              <div key={index} className='flex gap-5 items-center'>
                <input
                  type="text"
                  placeholder="Label"
                  value={field.label}
                  onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                  className='bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                />
                <input
                  type="text"
                  placeholder="Value"
                  // value={field.value}
                  onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                  className='bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                />
                <div>
                  <RiDeleteBin2Line className='text-red-500' size={22} onClick={() => handleDeleteField(index)} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Tabs defaultActiveKey="1" onChange={handleCustomFeildChange}>
            {items.map((item, index) => (
              <TabPane tab={item.title} key={item.key}>
                <textarea
                  className="w-full h-40 p-2 resize-none border border-gray-300 rounded-md"
                  placeholder="Enter your input"
                  onChange={(e) => handleCustomFeildChange(index, item.name, e.target.value)}
                ></textarea>
              </TabPane>
            ))}
          </Tabs>
        </div>
        <div className='mt-4'>
          <div className="mb-3 relative">
            <label
              htmlFor="formFile"
              className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >
              Upload Product Images
            </label>
            <input
              ref={inputFileRef}
              className="relative m-0 block w-full min-w-0 flex-auto rounded-full border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              id="formFile"
              onChange={handleFileChange}
            />

            <div className={`absolute top-7 right-0 ${selectedFiles[0] === undefined ? 'hidden' : 'block'}`}>
              {loading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} className='p-2 px-4 bg-black text-white font-semibold rounded-r-full' />
              ) : (
                <button className='p-2 px-4 bg-black text-white font-semibold rounded-r-full' onClick={imageUpload} disabled={loading} style={{ display: selectedFiles[0] === undefined ? 'none' : 'block' }}>
                  Upload
                </button>
              )}
            </div>
          </div>

          <div className='flex gap-3' id='preview'>
            {/* Render existing images */}
            {imageSources.map((source, index) => (
              <div
                key={index}
                style={{ position: 'relative' }}
                draggable
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop}
              >
                <img
                  src={source}
                  alt={`Preview ${index}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => openModal(source)}
                />
                <button
                  type='button'
                  name='deleteButton'
                  className="absolute top-0 right-0 p-1 text-xs bg-red-500 text-white"
                  onClick={() => deleteImage(index)}
                >
                  X
                </button>
              </div>
            ))}

          </div>

          <Modal open={modalVisible} onCancel={closeModal} footer={null}>
            <img src={selectedImage} alt="Preview" style={{ width: '100%', height: 'auto' }} />
          </Modal>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-black hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductForm;

