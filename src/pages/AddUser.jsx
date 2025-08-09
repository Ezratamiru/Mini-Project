import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '../store/usersSlice'

export default function AddUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.users)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resultAction = await dispatch(addUser(formData))
    if (addUser.fulfilled.match(resultAction)) {
      navigate('/')
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Add User</h2>
        <Link to="/" className="btn btn-outline-secondary">Back</Link>
      </div>

      {status === 'failed' && <div className="alert alert-danger">{error}</div>}

      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Website</label>
            <input
              className="form-control"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Saving...' : 'Save User'}
          </button>
        </div>
      </form>
    </div>
  )
}

