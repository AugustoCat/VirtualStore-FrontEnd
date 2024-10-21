import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Cart from "./Pages/cart/Cart"
import Shop from "./Pages/shop/Shop"
import ShopContextProvider from "./context/ShopContext"
import Orders from "./Pages/myOrder/Orders"

function App() {
  return (
    <>
    <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element= {<Shop /> }></Route>
            <Route path="/cart" element= {<Cart />}></Route>
            <Route path="/orders" element= {<Orders />}></Route>
          </Routes>
        </Router>
      </ShopContextProvider>
    </>
  )
}

export default App
