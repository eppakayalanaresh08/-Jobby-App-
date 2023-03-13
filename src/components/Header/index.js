import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-list">
      <ul className="nav-container">
        <Link to="/">
          <li className="list-name">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt=" website logo"
            />
          </li>
        </Link>
        <div className="container-nav-link">
          <Link to="/">
            <li className="list-name">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="list-name">Jobs</li>
          </Link>
        </div>
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
