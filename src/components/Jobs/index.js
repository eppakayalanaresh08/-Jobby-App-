import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import EachEmployment from '../EachEmployment'

import EmploymentRange from '../EmploymentRange'

import ProfileEmployment from '../ProfileEmployment'

import EmploymentType from '../EmploymentType'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsGetComponent = {
  initial: 'INITIAL',
  toSuccesses: 'SUCCESS',
  isLoading: 'LOADING',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    listActive: [],
    isPresentActive: jobsGetComponent.initial,
    inputSearch: '',
    employmentTypeId: '',
    salaryRangeId: '',
  }

  componentDidMount = () => {
    this.getComponent()
  }

  getComponent = async () => {
    const {inputSearch, employmentTypeId, salaryRangeId} = this.state
    this.setState({isPresentActive: jobsGetComponent.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeId}&minimum_package=${salaryRangeId}&search=${inputSearch}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responseData = await fetch(url, options)
    if (responseData.ok === true) {
      const data = await responseData.json()
      const updateActive = data.jobs.map(eachObject => ({
        companyLogoUrl: eachObject.company_logo_url,
        employmentType: eachObject.employment_type,
        jobDescription: eachObject.job_description,
        location: eachObject.location,
        packagePerAnnum: eachObject.package_per_annum,
        rating: eachObject.rating,
        title: eachObject.title,
        id: eachObject.id,
      }))
      this.setState({
        listActive: updateActive,
        isPresentActive: jobsGetComponent.toSuccesses,
      })
      //   console.log(updateActive)
    } else {
      this.setState({isPresentActive: jobsGetComponent.failure})
    }
  }

  renderSuccess = () => {
    const {listActive} = this.state
    const isLength = listActive.length > 0
    // const listsFilter = this.getFilterEach(listActive)

    // console.log(listActive)
    return (
      <ul>
        {isLength ? (
          listActive.map(eachObject => (
            <EachEmployment
              listEachObject={eachObject}
              key={eachObject.title}
            />
          ))
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="heading-jobs-no">No Jobs Found</h1>
            <p className="job-filter-no">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getComponent()
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickRetry} data-testid="button">
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitch = () => {
    const {isPresentActive} = this.state
    switch (isPresentActive) {
      case jobsGetComponent.toSuccesses:
        return this.renderSuccess()
      case jobsGetComponent.isLoading:
        return this.renderLoading()
      case jobsGetComponent.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  changeSearch = event => {
    this.setState({inputSearch: event.target.value})
  }

  onClickTypeEach = employmentTypeId => {
    this.setState({employmentTypeId}, this.getComponent)
  }

  renderEmploymentType = () => (
    <ul>
      {employmentTypesList.map(eachObject => (
        <EmploymentType
          listEachType={eachObject}
          onClickTypeEach={this.onClickTypeEach}
          key={eachObject.employmentTypeId}
        />
      ))}
    </ul>
  )

  onClickRange = salaryRangeId => {
    this.setState({salaryRangeId}, this.getComponent)
  }

  renderEmploymentRange = () => (
    <ul>
      {salaryRangesList.map(eachObject => (
        <EmploymentRange
          listEachRange={eachObject}
          onClickRange={this.onClickRange}
          key={eachObject.salaryRangeId}
        />
      ))}
    </ul>
  )

  onKeyEnter = event => {
    if (event.key === 'Enter') {
      this.getComponent()
    }
  }

  render() {
    const {inputSearch} = this.state

    return (
      <div className="bg-container-jobs">
        <Header />
        <div className="bg-Employment-jobs">
          <div className="card-type-range">
            <ProfileEmployment />
            <hr />
            <h1>Type of Employment</h1>
            {this.renderEmploymentType()}
            <hr />
            <h1>Salary Range</h1>
            {this.renderEmploymentRange()}
          </div>
          <div className="container-render">
            <div className="container-search">
              <input
                type="search"
                onChange={this.changeSearch}
                value={inputSearch}
                className="input-Element"
                placeholder="Search"
                onKeyDown={this.onKeyEnter}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="bg-search-icon"
                onClick={this.getComponent}
              >
                <BsSearch className="search-Element" />
              </button>
            </div>
            {this.renderSwitch()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
