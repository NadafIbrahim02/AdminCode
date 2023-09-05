
// Arrange Free React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
// import VirtualReality from "layouts/virtual-reality";
// import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Arrange Free React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Product from "layouts/product/Product";
import ProductList from "layouts/product/ProductList";
import ProductUpdate from "layouts/product/ProductUpdate";
import CustomerList from "layouts/Customer/CustomerList";
import Discount from "layouts/product/Discount";
import CustomerDetails from "layouts/Customer/CustomerDetails";
import AddCategory from "layouts/category/AddCategory";
import ListCategory from "layouts/category/ListCategory";
import PromoCode from "layouts/coupn/PromoCode";
// import UpdateCategory from "layouts/category/UpdateCategory";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddCategory",
    key: "add-category",
    route: "/add-category",
    icon: <CreditCard size="12px" />,
    component: <AddCategory />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "UpdateCategory",
  //   key: "update-category",
  //   route: "/update-category",
  //   icon: <CreditCard size="12px" />,
  //   component: <UpdateCategory />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "ListCategory",
    key: "list-category",
    route: "/list-category",
    icon: <CreditCard size="12px" />,
    component: <ListCategory />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product",
    key: "product",
    route: "/product",
    icon: <CreditCard size="12px" />,
    component: <Product />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Discount",
    key: "discount",
    route: "/discount",
    icon: <CreditCard size="12px" />,
    component: <Discount />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "PromoCode",
    key: "promo-code",
    route: "/promo-code",
    icon: <CreditCard size="12px" />,
    component: <PromoCode />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Product Update",
  //   key: "product-update",
  //   route: "/product-update",
  //   icon: <CreditCard size="12px" />,
  //   component: <ProductUpdate />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "ProductList",
    key: "product-list",
    route: "/product-list",
    icon: <CreditCard size="12px" />,
    component: <ProductList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CustomerList",
    key: "customer-list",
    route: "/customer-list",
    icon: <CreditCard size="12px" />,
    component: <CustomerList />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "CustomerDetails",
  //   key: "customer-details",
  //   route: "/customer-details",
  //   icon: <CreditCard size="12px" />,
  //   component: <CustomerDetails />,
  //   noCollapse: true,
  // },

 
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  // },








  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: <Profile />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: <Document size="12px" />,
  //   component: <SignIn />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
];

export default routes;
