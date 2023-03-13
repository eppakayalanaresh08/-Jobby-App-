import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const GetProfile = {
  isInitial: 'INITIAL',
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class ProfileEmployment extends Component {
  state = {
    isObjectProfile: '',
    isActiveSwitch: GetProfile.isInitial,
  }

  componentDidMount() {
    this.getProfileMount()
  }

  getProfileMount = async () => {
    this.setState({isActiveSwitch: GetProfile.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchData = await fetch(url, options)
    console.log(fetchData)
    if (fetchData.ok === true) {
      const dataProfile = await fetchData.json()
      const updateData = {
        profileDetails: {
          name: dataProfile.profile_details.name,
          profileImageUrl: dataProfile.profile_details.profile_image_url,
          shortBio: dataProfile.profile_details.short_bio,
        },
      }
      this.setState({
        isObjectProfile: updateData,
        isActiveSwitch: GetProfile.isSuccess,
      })
    } else {
      this.setState({isActiveSwitch: GetProfile.isFailure})
    }
  }

  renderSuccess = () => {
    const {isObjectProfile} = this.state
    const {profileDetails} = isObjectProfile
    // console.log(isObjectProfile)
    return (
      <div className="bg-container-profile">
        <img src={profileDetails.profileImageUrl} alt="profile" />
        <h1 className="profile-details-name">{profileDetails.name}</h1>
        <p className="profile-details-bio">{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickProfileRetry = () => this.getProfileMount()

  renderFailure = () => (
    <div className="bg-container">
      <Link to="/jobs">
        <button
          className="retry-button"
          type="button"
          data-testid="button"
          onClick={this.onClickProfileRetry}
        >
          Retry
        </button>
      </Link>
    </div>
  )

  render() {
    const {isActiveSwitch} = this.state
    switch (isActiveSwitch) {
      case GetProfile.isSuccess:
        return this.renderSuccess()
      case GetProfile.isLoading:
        return this.renderLoading()
      case GetProfile.isFailure:
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default ProfileEmployment
