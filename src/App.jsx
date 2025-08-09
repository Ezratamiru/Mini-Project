import { Routes, Route, Link } from 'react-router-dom'
import UsersList from './pages/UsersList'
import UserDetail from './pages/UserDetail'
import AddUser from './pages/AddUser'
import './App.css'

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">User Management</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
    </div>
  )
}
