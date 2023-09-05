// @mui material components
import Card from "@mui/material/Card";

// Arrange Free React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Arrange Free React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import UpdatedForm from "./components/UpdatedForm";



function ProductUpdate() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <UpdatedForm />
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default ProductUpdate;
