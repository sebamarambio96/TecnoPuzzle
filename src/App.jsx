import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ItemListContainer } from './components/container/itemListContainer/ItemListContainer'
import { NavBar } from './components/NavBar/NavBar'
import { ItemDetailContainer } from './components/container/itemDetailContainer/itemDetailContainer'
import { CartContainer } from './components/container/CartContainer/CartContainer'
import { LoginContainer } from './components/container/LoginContainer/LoginContainer'
import './App.css'
import { getItems } from './services/firebase'
import { CardContextProvider } from './components/context/CartContext'



function App() {
  getItems()
  return (
    <CardContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/inicio' element={<ItemListContainer />} />

          <Route path='/category/:categoryId' element={<ItemListContainer />} />
          <Route path='/detail/:detailId' element={<ItemDetailContainer />} />
          <Route path='/cart' element={<CartContainer />} />
          <Route path='/login' element={<LoginContainer />} />

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </CardContextProvider>
  )
}

export default App
