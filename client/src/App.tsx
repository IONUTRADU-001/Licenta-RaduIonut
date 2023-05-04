import './App.css'
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context";
import BookingPage from "./pages/BookingPage";
import BookingsPage from "./pages/BookingsPage";
import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesFormPageNew from "./pages/PlacesFormPageNew";
import PlacesPage from "./pages/PlacesPage";
import ProfilePage from "./pages/ProfilePage";
import { container } from "./ioc/ioc";
import CheckAuth from "./checkAuth";
import IndexPage from "./pages/IndexPage";

function App() {
  return (
    <UserContextProvider container={container}>
      <CheckAuth>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/places/new" element={<PlacesFormPageNew />} />
            <Route path="/account/places/:id" element={<PlacesFormPage />} />
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route path="/account/bookings/:id" element={<BookingPage />} />
          </Route>
        </Routes>
      </CheckAuth>
    </UserContextProvider>
  )
}

export default App
