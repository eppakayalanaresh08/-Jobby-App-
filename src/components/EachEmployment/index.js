import {AiFillStar} from 'react-icons/ai'

import {ImLocation2} from 'react-icons/im'

import {HiMail} from 'react-icons/hi'

import {Link} from 'react-router-dom'

import './index.css'

const EachEmployment = props => {
  const {listEachObject} = props
  const {
    companyLogoUrl,
    title,
    rating,
    packagePerAnnum,
    employmentType,
    location,
    jobDescription,
    id,
  } = listEachObject
  //   console.log(listEachObject)
  return (
    <Link to={`jobs/${id}`}>
      <li className="bg-container-card">
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
            <HiMail className="location-icon left-icon" />

            <p className="name-internship">{employmentType}</p>
          </div>
          <p className="package-name">{packagePerAnnum}</p>
        </div>
        <hr className="line-jobs" />
        <div>
          <h1 className="description-name">Description</h1>
          <p className="matter-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default EachEmployment
