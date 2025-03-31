import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from './componants/Layout';
import All from './componants/All';
import Custom from './componants/Custom';
import Icp from './componants/Icp';
import Mission from './componants/Mission';
import Product from './componants/Product';
import { BlogData } from './BlogData';
import { useState, useEffect } from 'react';

function App() {
  const [blogData, setBlogData] = useState([]);

  useEffect(()=>{
    setBlogData(BlogData);
  },[])
  
  return (
    <BrowserRouter>
      <Layout blogData={blogData} setBlogData={setBlogData} />
      <Routes>
        <Route path='/all' element={<All />} />
        <Route path='/custom' element={<Custom blogData={blogData} setBlogData={setBlogData} />} />
        <Route path='/icp' element={<Icp />} />
        <Route path='/mission' element={<Mission />} />
        <Route path='/product' element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
