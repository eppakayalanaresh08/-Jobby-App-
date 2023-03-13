import {Component} from 'react'

import Cookies from 'js-cookie'

// import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {ImLocation2} from 'react-icons/im'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const GetJobsActive = {
  isInitial: 'INITIAL',
  isSuccess: 'SUCCESS',
  isLoading: 'LOADING',
  isFailure: 'FAILURE',
}

class JObDescription extends Component {
  state = {
    listEachId: '',
    isActiveID: GetJobsActive.isInitial,
  }

  componentDidMount() {
    this.getMountJob()
  }

  getMountJob = async () => {
    this.setState({isActiveID: GetJobsActive.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const JwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${JwtToken}`},
    }
    const fetchData = await fetch(url, options)
    if (fetchData.ok === true) {
      const data = await fetchData.json()
      console.log(data)
      const updateJob = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          title: data.job_details.title,
          packagePerAnnum: data.job_details.package_per_annum,
          jobDescription: data.job_details.job_description,
          employmentType: data.job_details.employment_type,
          rating: data.job_details.rating,
          location: data.job_details.location,
          id: data.job_details.id,
          lifeAtCompany: {
            imageUrl: data.job_details.life_at_company.image_url,
            description: data.job_details.life_at_company.description,
          },
          skills: data.job_details.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
        },
        similarJobs: data.similar_jobs.map(eachSimilar => ({
          companyLogoUrl: eachSimilar.company_logo_url,
          employmentType: eachSimilar.employment_type,
          jobDescription: eachSimilar.job_description,
          location: eachSimilar.location,
          rating: eachSimilar.rating,
          title: eachSimilar.title,
        })),
      }

      this.setState({
        listEachId: updateJob,
        isActiveID: GetJobsActive.isSuccess,
      })
      //   console.log(data)
    } else {
      this.setState({isActiveID: GetJobsActive.isFailure})
    }
  }

  renderSimilar = () => {
    const {listEachId} = this.state
    const {similarJobs} = listEachId
    return (
      <div>
        <h1 className="heading-similar-jobs">Similar Jobs</h1>
        <ul className="lists-container-similar">
          {similarJobs.map(eachObject => (
            <li className="list-Similar" key={eachObject.title}>
              <div className="container-logo">
                <img
                  src={eachObject.companyLogoUrl}
                  alt="similar job company logo"
                  className="image-logo"
                />
                <div className="container-title">
                  <h1 className="title">{eachObject.title}</h1>
                  <div className="container-rating">
                    <AiFillStar className="star" />
                    <p className="rating">{eachObject.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="heading-description">Description</h1>
              <p className="description-name">{eachObject.jobDescription}</p>
              <div className="container-package">
                <div className="container-type-job">
                  <ImLocation2 className="location-image" />
                  <p className="name-location">{eachObject.location}</p>
                  <p className="name-internship">{eachObject.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessSwitch = () => {
    const {listEachId} = this.state
    console.log(listEachId)
    // console(listEachId)
    const {jobDetails} = listEachId
    console.log(jobDetails)
    const {
      companyLogoUrl,
      title,
      jobDescription,
      rating,
      employmentType,
      location,
      packagePerAnnum,
      skills,
      lifeAtCompany,
      companyWebsiteUrl,
    } = jobDetails
    console.log(companyWebsiteUrl)
    const {imageUrl, description} = lifeAtCompany
    console.log(lifeAtCompany)
    return (
      <div className="container-card-job">
        <div className="bg-card-Container">
          <div className="container-logo">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="image-logo"
            />
            <div className="container-title">
              <h1 className="title">{title}</h1>
              <div className="container-rating">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="container-package">
            <div className="container-type-job">
              <ImLocation2 className="location-image" />
              <p className="name-location">{location}</p>
              <p className="name-internship">{employmentType}</p>
            </div>
            <p className="package-name">{packagePerAnnum}</p>
          </div>
          <hr className="line-jobs" />
          <div>
            <h1 className="description-name">Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
            <p className="matter-description">{jobDescription}</p>
          </div>
          <h1 className="skills-Element">Skills</h1>
          <ul className="list-skills">
            {skills.map(eachObjectSkill => (
              <li className="list-each-skill" key={eachObjectSkill.name}>
                <img
                  src={eachObjectSkill.imageUrl}
                  alt={eachObjectSkill.name}
                  className="image-skill"
                />
                <p className="list-name">{eachObjectSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="Life-heading">Life at Company</h1>
          <div className="container-Life">
            <p className="description-Life">{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>
        {this.renderSimilar()}
      </div>
    )
  }

  renderIsLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getMountJob()
  }

  renderIsFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickRetry} data-testid="button">
        Retry
      </button>
    </div>
  )

  renderSwitchGet = () => {
    const {isActiveID} = this.state
    switch (isActiveID) {
      case GetJobsActive.isSuccess:
        return this.renderSuccessSwitch()
      case GetJobsActive.isLoading:
        return this.renderIsLoading()
      case GetJobsActive.isFailure:
        return this.renderIsFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container-description">
        <Header />
        {this.renderSwitchGet()}
      </div>
    )
  }
}

export default JObDescription
