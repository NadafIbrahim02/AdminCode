// @mui material components
import Card from "@mui/material/Card";

// Arrange Free React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Arrange Free React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomerListing from "./components/CustomerListing";
import CustomerTabs from "./components/CustomerTabs";

// import Footer from "examples/Footer";




function CustomerDetails() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CustomerTabs />
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default CustomerDetails;
