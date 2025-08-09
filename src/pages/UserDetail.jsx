import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchUserById } from '../store/usersSlice'

export default function UserDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedUser, status, error } = useSelector((state) => state.users)

  useEffect(() => {
    if (!selectedUser || String(selectedUser.id) !== String(id)) {
      dispatch(fetchUserById(id))
    }
  }, [id, selectedUser, dispatch])

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">User Detail</h2>
        <Link to="/" className="btn btn-outline-secondary">Back</Link>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading user...</div>}
      {status === 'failed' && <div className="alert alert-danger">{error}</div>}

      {selectedUser && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{selectedUser.name}</h5>
            {selectedUser.email && <p className="card-text">Email: {selectedUser.email}</p>}
            {selectedUser.phone && <p className="card-text">Phone: {selectedUser.phone}</p>}
            {selectedUser.website && <p className="card-text">Website: {selectedUser.website}</p>}
            {selectedUser.company && selectedUser.company.name && (
              <p className="card-text">Company: {selectedUser.company.name}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

