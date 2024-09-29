import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './Components/Base';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Home from './pages/Home';
import Services from './pages/Services';
import UserDashboard from './pages/user-routes/UserDashboard';
import PrivateRoute from './Components/PrivateRoute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';
import UpdateBlog from './pages/UpdateBlog';
import HomePage from './pages/HomePage';


function App() {
  return (  
    <UserProvider>
      <BrowserRouter>
      <ToastContainer position="top-center"></ToastContainer>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/home" element={<HomePage/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/posts/:postId" element={<PostPage/>}/>
        <Route path="/categories/:categoryId" element={<Categories/>}/>
        

        <Route path="/user" element={<PrivateRoute/>}>

            <Route path="dashboard" element={<UserDashboard/>}/>
            <Route path="profile-info/:user_id" element={<ProfileInfo/>}/>
            <Route path="update-blog/:blogId" element={<UpdateBlog/>}/>
        </Route>
        
              
        
        
      </Routes>
      </BrowserRouter>
      </UserProvider>
  );
}

export default App;
