import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import { ROUTES } from "./constants/routes";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/404Page";
import CheckOutPage from "./pages/CheckOutPage";
import ShopDetailPage from "./pages/ShopDetailPage";
import ShopPage from "./pages/ShopPage";
import TestimonialPage from "./pages/TestimonialPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import DryPage from "./pages/DryPage";
import WetPage from "./pages/WetPage";
import TermOfUsePage from "./pages/TermOfUsePage";
import SalenRefundPage from "./pages/SalenRefundPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WhypplikeUsPage from "./pages/WhypplikeUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import FAQPage from "./pages/FAQPage";
import AccountPage from "./pages/AccountPage";
import WishListPage from "./pages/WishListPage";
import HistoryPurchasePage from "./pages/HistoryPurchasePage";
import ChangePassPage from "./pages/ChangePassPage";
import BestSellerPage from "./pages/BestSellerPage";

function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout></MainLayout>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path={ROUTES.HOME_PAGE} element={<HomePage></HomePage>}></Route>
            <Route path={ROUTES.CART_PAGE} element={<CartPage></CartPage>}></Route>
            <Route path={ROUTES.PAGE_404} element={<Page404></Page404>}></Route>
            <Route path={ROUTES.CHECKOUT_PAGE} element={<CheckOutPage></CheckOutPage>}></Route>
            <Route path={ROUTES.SHOP_DETAIL_PAGE} element={<ShopDetailPage></ShopDetailPage>}></Route>
            <Route path={ROUTES.SHOP_PAGE} element={<ShopPage></ShopPage>}></Route>
            <Route path={ROUTES.CONTACT_PAGE} element={<ContactPage></ContactPage>}></Route>
            <Route path={ROUTES.DRY_PAGE} element={<DryPage></DryPage>}></Route>
            <Route path={ROUTES.BESTSELLER_PAGE} element={<BestSellerPage></BestSellerPage>}></Route>
            <Route path={ROUTES.WET_PAGE} element={<WetPage></WetPage>}></Route>
            <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage></LoginPage>}></Route>
            <Route path={ROUTES.REGISTER_PAGE} element={<RegisterPage></RegisterPage>}></Route>
            <Route path={ROUTES.TERMOFUSE_PAGE} element={<TermOfUsePage></TermOfUsePage>}></Route>
            <Route path={ROUTES.SALENREFUND_PAGE} element={<SalenRefundPage></SalenRefundPage>}></Route>
            <Route path={ROUTES.PRIVACYPOLICY_PAGE} element={<PrivacyPolicyPage></PrivacyPolicyPage>}></Route>
            <Route path={ROUTES.TESTIMONIAL_PAGE} element={<TestimonialPage></TestimonialPage>}></Route>
            <Route path={ROUTES.WHYPPLIKEUS_PAGE} element={<WhypplikeUsPage></WhypplikeUsPage>}></Route>
            <Route path={ROUTES.ABOUTUS_PAGE} element={<AboutUsPage></AboutUsPage>}></Route>
            <Route path={ROUTES.FAQ_PAGE} element={<FAQPage></FAQPage>}></Route>
            <Route path={ROUTES.ACCOUNT_PAGE} element={<AccountPage></AccountPage>}></Route>
            <Route path={ROUTES.WISHLIST_PAGE} element={<WishListPage></WishListPage>}></Route>
            <Route path={ROUTES.HISTORYPURCHASE_ACCOUNT_PAGE} element={<HistoryPurchasePage></HistoryPurchasePage>}></Route>
            <Route path={ROUTES.CHANGEPASS_ACCOUNT_PAGE} element={<ChangePassPage></ChangePassPage>}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
