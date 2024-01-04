import './App.css'
import { Route,Routes } from 'react-router-dom'
import { UserContextProvider } from './UserContext';
import axios from 'axios';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';

import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingPage from './pages/BookingPage';
import BookingsPage from './pages/BookingsPage';

//axios config
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_DEFAULT_BASE;
axios.defaults.withCredentials=true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />}/>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/account/' element={<ProfilePage/>}></Route>
          <Route path='/account/places' element={<PlacesPage/>}></Route>
          <Route path='/account/places/new' element={<PlacesFormPage />}></Route>
          <Route path='/account/places/:id' element={<PlacesFormPage />}></Route>
          <Route path='/place/:id' element={<PlacePage />}></Route>
          <Route path='/account/bookings' element={<BookingsPage />}></Route>
          <Route path='/account/bookings/:id' element={<BookingPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
