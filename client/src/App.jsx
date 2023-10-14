import './App.css'
import { Route,Routes } from 'react-router-dom'
import { UserContextProvider } from './UserContext';
import axios from 'axios';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
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
          <Route path='/account/:subpage?' element={<AccountPage/>}></Route>
          <Route path='/account/:subpage/:action?' element={<AccountPage/>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
