import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Buyer from "./pages/Buyer.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Supplier from "./pages/Supplier.jsx";
import BuyerRegister from "./pages/BuyerRegister.jsx";
import Contact from "./pages/Contact.jsx";
import SupplierRegister from "./pages/SupplierRegister.jsx";
import GetAQuote from "./pages/GetAQuote.jsx";

import SupplierTable from "./components/admin/SupplierTable.jsx";
import BuyerTable from "./components/admin/BuyerTable.jsx";
import Category from "./pages/Common/Category.jsx";
import SubCategory from "./pages/Common/SubCategory.jsx";
import Catalog from "./pages/Common/Catalog.jsx";
import Inquiry from "./pages/admin/Inquiry.jsx";
import Specification from "./pages/admin/Specification.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import ProductView from "./pages/admin/ProductView.jsx";
import ProductListOutlet from "./pages/admin/ProductListOutlet.jsx";
import ProductEditPage from "./components/common/ProductEditPage.jsx";
import ProductEdit from "./pages/Common/ProductEdit.jsx";
import ContactUs from "./pages/admin/ContactUs.jsx";
import BuyerAdmin from "./pages/Buyer-admin/BuyerAdmin.jsx";
import BuyerDashboard from "./pages/Buyer-admin/BuyerDashboard.jsx";
import CreateRFQ from "./pages/Buyer-admin/CreateRFQ.jsx";
import NewOrder from "./pages/admin/NewOrder.jsx";
import OrderHistory from "./pages/admin/OrderHistory.jsx";
import MyRFQ from "./pages/Buyer-admin/MyRFQ.jsx";
import RFQList from "./pages/admin/RFQList.jsx";
import RFQListOutlet from "./pages/admin/RFQListOutlet.jsx";
import RFQDetailTable from "./components/admin/RFQDetailTable.jsx";
import UpdateRFQ from "./pages/admin/UpdateRFQ.jsx";
import MyRFQOutlet from "./pages/Buyer-admin/MyRFQOutlet.jsx";
import RFQHistory from "./pages/Buyer-admin/RFQHistory.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import BRFQOutlet from "./components/admin/BRFQOutlet.jsx";
import BRFQ from "./pages/admin/BRFQ.jsx";

import Profile from "./pages/Common/Profile.jsx";
import SupplierAdmin from "./pages/Supplier-admin/SupplierAdmin.jsx";
import SupplierDashboard from "./pages/Supplier-admin/SupplierDashboard.jsx";
import NewBRFQ from "./pages/Supplier-admin/NewBRFQ.jsx";
import RFQDetail from "./components/buyer/RFQDetail.jsx";
import Assign from "./pages/admin/Assign.jsx";
import NewBRFQOutlet from "./components/supplier/NewBRFQOutlet.jsx";
import AssignBRFQDetail from "./components/supplier/AssignBRFQDetail.jsx";
import AssignedBRFQ from "./pages/Supplier-admin/AssignedBRFQ.jsx";
import CreateQuotation from "./pages/Supplier-admin/CreateQuotation.jsx";
import VerifyOTP from "./components/VerifyOTP.jsx";
import SupplierProfile from "./pages/Supplier-admin/SupplierProfile.jsx";
import SupplierProfileOutlet from "./pages/Supplier-admin/SupplierProfileOutlet.jsx";
import SupplierProfileUpdate from "./pages/Supplier-admin/SupplierProfileUpdate.jsx";
import ChangePassword from "./pages/Common/ChangePassword.jsx";
import ProductListsForSupplierOutlet from "./pages/Common/ProductListsForSupplierOutlet.jsx";
import ProductListForSupplier from "./pages/Common/ProductListForSupplier.jsx";
import ProductViewPage from "./pages/Supplier-admin/ProductViewPage.jsx";
import MyQuotation from "./pages/Supplier-admin/MyQuotation.jsx";
import VRFQOutlet from "./components/admin/VRFQOutlet.jsx";
import VRFQPage from "./pages/admin/VRFQPage.jsx";
import VRFQDetailPage from "./pages/admin/VRFQDetailPage.jsx";
import BRFQDetail from "./pages/admin/BRFQDetail.jsx";
import OrderDetail from "./pages/Common/OrderDetail.jsx";
import NewOrderOutlet from "./components/admin/NewOrderOutlet.jsx";
import Order from "./pages/Supplier-admin/Order.jsx";
import UpdateTracking from "./pages/Common/UpdateTracking.jsx";
import BuyerOrder from "./pages/Buyer-admin/BuyerOrder.jsx";
import CompareQuotation from "./pages/admin/CompareQuotation.jsx";
import QuotationDetail from "./pages/Supplier-admin/QuotationDetail.jsx";
import BuyerOrderHistory from "./pages/Buyer-admin/BuyerOrderHistory.jsx";
import SupplierOrderHistory from "./pages/Supplier-admin/SupplierOrderHistory.jsx";
import QuotationEdit from "./pages/Supplier-admin/QuotationEdit.jsx";
import ApprovedRFQ from "./pages/admin/ApprovedRFQ.jsx";
import CommonOutlet from "./pages/Common/CommonOutlet.jsx";
import BuyerProfile from "./pages/Buyer-admin/BuyerProfile.jsx";
import BuyerProfileUpdate from "./pages/Buyer-admin/BuyerProfileUpdate.jsx";
import AdminProfileUpdate from "./pages/admin/AdminProfileUpdate.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import PasswordVerifyOTP from "./components/PasswordVerifyOtp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import About from "./pages/About.jsx";
import UserProfiles from "./pages/admin/UserProfiles.jsx"
import NotFount from "./pages/Common/NotFount.jsx";
import AddBuyer from "./pages/admin/AddBuyer.jsx";
import UpdatePassword from "./pages/Common/UpdatePassword.jsx";
import UpdateUser from "./pages/admin/UpdateUser.jsx";
import AddSupplier from "./pages/admin/AddSupplier.jsx";
import CreateRFQbyAdmin from "./pages/admin/CreateRFQbyAdmin.jsx";
import AdminCatalog from "./pages/admin/AdminCatalog.jsx";
import SupplierProductList from "./pages/admin/SupplierProductList.jsx";
import ApprovedBRFQ from "./pages/admin/ApprovedBRFQ.jsx";
import ApprovedVRFQ from "./pages/admin/ApprovedVRFQ.jsx";




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<NotFount/>} /> 
      {/* User Routes */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/buyer-register" element={<BuyerRegister />} />
        <Route path="/supplier-register" element={<SupplierRegister />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<GetAQuote />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="verify-otp" element={<VerifyOTP/>} />
        <Route path="/forget-password" element={<CommonOutlet/>}>
           <Route index element={<ForgotPassword/>}/> 
           <Route path="verify-otp" element={<PasswordVerifyOTP/>} />
        </Route>
        
      </Route>
        <Route path="/reset-password" element={
          <ProtectedRoute allowedRoles={["admin", "buyer", "supplier"]}>
          <ResetPassword/>
          </ProtectedRoute>} />   

      {/* Admin Panel with Nested Routes */}


      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<CommonOutlet/>} >
          <Route index element={<Profile/>} />
          <Route path="update" element={<AdminProfileUpdate/>}/>
        </Route>
        <Route path="user-profile/:id" element={<UserProfiles/>} />
        <Route path="update-password/:id" element={<UpdatePassword/>}/>
        <Route path="suppliers" element={<CommonOutlet/>} >
          <Route index element={<SupplierTable />}/>
          <Route path="add-supplier" element={<AddSupplier/>} />
          <Route path='product-list/:id' element={<SupplierProductList/>} />
          <Route path="update-user/:id" element={<UpdateUser/>}/>
        </Route>
        <Route path="create-rfq" element={<CommonOutlet/>} >
           <Route index element={<CreateRFQbyAdmin/>} />
         </Route>
        <Route path="buyer" element={<CommonOutlet/>}>
          <Route index element={<BuyerTable />}/>
          <Route path="add-buyer" element={<AddBuyer/>} />
          
          <Route path="update-user/:id" element={<UpdateUser/>}/>
        </Route>
        <Route path="category" element={<Category />} />
        <Route path="sub-category" element={<SubCategory />} />
        <Route path="catalog" element={<AdminCatalog />} />
        <Route path="inquiries" element={<Inquiry />} />
        <Route path="specification" element={<Specification />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="rfq-list" element={<RFQListOutlet />}>
          <Route index element={<RFQList />} />
          <Route path="rfq-detail/:id" element={<RFQDetailTable />} />
          <Route path="update-rfq/:id" element={<UpdateRFQ />} />
        </Route>
        <Route path="approved-rfq" element={<RFQListOutlet/>}>
          <Route index element={<ApprovedRFQ/>} />
          <Route path="rfq-detail/:id" element={<RFQDetailTable />} />
        </Route>
        <Route path="brfq" element={<BRFQOutlet/>}>
          <Route index element={<BRFQ/>} />
          <Route path="assign/:id" element={<Assign/>} />
          <Route path="detail/:id" element={<BRFQDetail/>} />
        </Route>
        <Route path="approved-brfq" element={<CommonOutlet/>}>
           <Route index element={<ApprovedBRFQ/>}/>
            <Route path="assign/:id" element={<Assign/>} />
          <Route path="detail/:id" element={<BRFQDetail/>} />
        </Route>
        <Route path="vrfq" element={<VRFQOutlet/>}>
           <Route index element={<VRFQPage/>} />
           <Route path="vrfq-detail/:id" element={<VRFQDetailPage/>} />
           <Route path="compare-quotation" element={<CompareQuotation/>}/>
        </Route>
        <Route path="approved-vrfq" element={<CommonOutlet/>}>
          <Route index element={<ApprovedVRFQ/>} />
          <Route path="vrfq-detail/:id" element={<VRFQDetailPage/>} />
        </Route>
        <Route path="product-list" element={<ProductListOutlet />}>
          <Route index element={<ProductList />} />
          <Route path="product-view/:id" element={<ProductView />} />
          <Route path="product-edit/:id" element={<ProductEdit />} />
        </Route>
        <Route path="order" element={<NewOrderOutlet />} >
         <Route index element={<NewOrder/>}/>
         <Route path="order-detail/:id" element={<OrderDetail/>} />
        </Route>
        <Route path="order-history" element={<NewOrderOutlet />} >
          <Route index element={<OrderHistory/>} />
          <Route path="order-detail/:id" element={<OrderDetail/>} />
        </Route>
        <Route path="change-password" element={<ChangePassword/>}/>
        
      </Route>

      {/* Buyer admin Panel with nested routes */}

      <Route
        path="/buyer-admin"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <BuyerAdmin />
          </ProtectedRoute>
        }
      >
        <Route index element={<BuyerDashboard />} />
        <Route path="create-rfq" element={<CreateRFQ />} />
        <Route path="my-rfq" element={<MyRFQOutlet />}>
          <Route index element={<MyRFQ />} />
          <Route path="rfq-history/:id" element={<RFQHistory />} />
          <Route path="rfq-detail/:id" element={<RFQDetail/>}/>
        </Route>
        <Route path="order" element={<NewOrderOutlet/>}>
           <Route index element={<BuyerOrder/>}/>
           <Route path="order-detail/:id" element={<OrderDetail/>} />
        </Route>
        <Route path="order-history" element={<NewOrderOutlet/>}>
           <Route index element={<BuyerOrderHistory/>}/>
           <Route path="order-detail/:id" element={<OrderDetail/>} />

        </Route>
        <Route path="profile" element={<CommonOutlet/>}>
           <Route index element={<BuyerProfile/>}/>
           <Route path="update" element={<BuyerProfileUpdate/>} />
        </Route>
        <Route path="change-password" element={<ChangePassword/>} />
      </Route>


      {/* Supplier Admin panel with nested routes */}

      <Route path="/supplier-admin" element={
        <ProtectedRoute allowedRoles={["supplier"]}>
           <SupplierAdmin/>
        </ProtectedRoute>
      }>
        <Route index element={<SupplierDashboard/>} />
        <Route path="my-quotation" element={<NewOrderOutlet/>}>
           <Route index element={<MyQuotation/>} />
           <Route path="quotation-detail/:id" element={<QuotationDetail/>} />
           <Route path="quotation-edit/:id" element={<QuotationEdit/>}/>
        </Route>
        <Route path="category" element={<Category/>}/>
        <Route path="sub-category" element={<SubCategory/>} />
        <Route path="specification" element={<Specification/>} />
        <Route path="catalog" element={<Catalog/>} />
        <Route path="product-list" element={<ProductListsForSupplierOutlet/>}>
          <Route index element={<ProductListForSupplier/>} />
          <Route path="product-view/:id" element={<ProductViewPage/>} />
          <Route path="product-edit/:id" element={<ProductEdit/>} />
        </Route>
        <Route path="brfq" element={<NewBRFQOutlet/>}>
           <Route index element={<NewBRFQ/>}/>
           <Route path="detail/:id" element={<AssignedBRFQ/>}/>
           <Route path="add-quotation/:id" element={<CreateQuotation/>}/>
          
        </Route>
         <Route path="profile" element={<SupplierProfileOutlet/>}>
           <Route index element={<SupplierProfile/>}/>
           <Route path="update" element={<SupplierProfileUpdate/>}/>
          </Route>
          <Route path="change-password" element={<ChangePassword/>}/>
          <Route path="order" element={<NewOrderOutlet/>}>
            <Route index element={<Order/>} />
            <Route path="order-detail/:id" element={<OrderDetail/>} />
            <Route path="order-update/:id" element={<UpdateTracking/>} />
          </Route>
          <Route path="order-history" element={<NewOrderOutlet/>}>
             <Route index element={<SupplierOrderHistory/>} />
             <Route path="order-detail/:id" element={<OrderDetail/>} />

          </Route>
          
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
