import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowError: false,
    errorMsg: '',
  }

  onClickAnotherRender = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    this.setState({username: '', password: ''})
    // console.log(jwtToken)
  }

  onClickFailure = errorMsg => {
    this.setState({isShowError: true, errorMsg})
    console.log(errorMsg)
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const updateLogin = {username, password}
    console.log(updateLogin)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(updateLogin),
    }
    const fetchData = await fetch(url, options)
    console.log(fetchData)
    const data = await fetchData.json()
    if (fetchData.ok === true) {
      this.onClickAnotherRender(data.jwt_token)
    } else {
      this.onClickFailure(data.error_msg)
    }
  }

  onChangeName = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  render() {
    const {password, username, isShowError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container-Login">
        <form className="bg-card-form" onSubmit={this.onClickSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image-logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="label-input">
              USERNAME
            </label>
            <input
              placeholder="Username"
              id="username"
              className="input-Element"
              value={username}
              type="text"
              onChange={this.onChangeName}
            />
            <label htmlFor="password" className="label-input">
              PASSWORD
            </label>
            <input
              placeholder="Password"
              id="password"
              className="input-Element"
              value={password}
              type="password"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="button-Login">
              Login
            </button>
            {isShowError && <p className="error-msg">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
