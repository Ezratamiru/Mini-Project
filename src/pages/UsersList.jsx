import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers, setSearchQuery } from '../store/usersSlice'

export default function UsersList() {
  const dispatch = useDispatch()
  const { list, status, error, searchQuery } = useSelector((state) => state.users)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [status, dispatch])

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return list
    return list.filter((u) =>
      [u.name, u.email]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(query))
    )
  }, [list, searchQuery])

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Users</h2>
        <Link to="/add" className="btn btn-primary">Add User</Link>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />

      {status === 'loading' && <div className="alert alert-info">Loading users...</div>}
      {status === 'failed' && <div className="alert alert-danger">{error}</div>}

      <ul className="list-group">
        {filteredUsers.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{user.name}</strong>
              {user.email && <span className="text-muted ms-2">{user.email}</span>}
            </span>
            <span className="badge text-bg-secondary">View</span>
          </Link>
        ))}
      </ul>
    </div>
  )
}

