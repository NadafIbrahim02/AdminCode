// @mui material components
import Card from "@mui/material/Card";

// Arrange Free React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Arrange Free React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ApplyPromoCode from "./components/ApplyPromoCode";
// import Footer from "examples/Footer";





function PromoCode() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ApplyPromoCode />
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default PromoCode;
