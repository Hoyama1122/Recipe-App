import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import Posts from "./pages/Posts";
import { Bounce, ToastContainer } from "react-toastify";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="">
   
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Posts />} />
          <Route path='/login' element={<Login />} />
          {/* 404 Page  */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600">ไม่พบหน้าที่คุณค้นหา</p>
                </div>
              </div>
            }
          />
        </Routes>
        {/* ToastContainer  */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={3}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
          toastId="prevent-duplicate"
        />
      </div>
    </Router>
  );
}

export default App;
