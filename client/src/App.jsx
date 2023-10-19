import './App.css'
import { Route,Routes } from 'react-router-dom'
import { UserContextProvider } from './UserContext';
import axios from 'axios';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/ProfilePage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
//axios config
axios.defaults.baseURL='http://127.0.0.1:4000';
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
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
