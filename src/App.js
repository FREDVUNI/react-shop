import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Cart from './components/Cart'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Products from './components/Products'
import Product from './components/Product'
import Profile from './components/Profile'
import GetCategories from './components/admin/category/Categories'
import EditCategory from './components/admin/category/Category'
import AddCategory from './components/admin/category/Add'
import GetProducts from './components/admin/product/Products'
import EditProduct from './components/admin/product/Product'
import AddProduct from './components/admin/product/Add'
import Footer from './components/Footer'
import PageNotFound from './components/PageNotFound'
import Contact from './components/Contact'
import {CartProvider} from './context/CartContext'
import {UserProvider} from './context/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <CartProvider>
      <UserProvider>
      <Router>
        <ToastContainer/>
          <NavBar/>
          <Routes>
              <Route path="/" element={<Home/>}/>  
              <Route path="/cart" element={<Cart/>}/>  
              <Route path="/products" element={<Products/>}/>  
              <Route path="/product/:id" element={<Product/>}/>  
              <Route path="/sign-in" element={<SignIn/>}/>  
              <Route path="/sign-up" element={<SignUp/>}/>   
              <Route path="/profile" element={<Profile/>}/>  
              <Route path="/contact" element={<Contact/>}/>  
              <Route path="/admin/categories" element={<GetCategories/>}/>  
              <Route path="/admin/category" element={<AddCategory/>}/>  
              <Route path="/admin/category/:id" element={<EditCategory/>}/>
              <Route path="/admin/products" element={<GetProducts/>}/>  
              <Route path="/admin/product" element={<AddProduct/>}/>  
              <Route path="/admin/product/:id" element={<EditProduct/>}/>  
              <Route path="*" element={<PageNotFound/>}/>  
          </Routes>
          <Footer/>
      </Router>
      </UserProvider>
      </CartProvider>
    </div>
  );
}

export default App;
