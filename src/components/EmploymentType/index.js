// import {TbSquareRoundedFilled} from 'react-icons/tb'

import './index.css'

const EmploymentType = props => {
  const {listEachType, onClickTypeEach} = props
  const {label, employmentTypeId} = listEachType
  const onClickElement = () => {
    onClickTypeEach(employmentTypeId)
  }

  return (
    <li className="list-Element" onClick={onClickElement}>
      <input
        type="checkbox"
        className="check-radio"
        id={employmentTypeId}
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId} className="check-label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentType
