// import {TbSquareRoundedFilled} from 'react-icons/tb'

import './index.css'

const EmploymentRange = props => {
  const {listEachRange, onClickRange} = props
  const {label, salaryRangeId} = listEachRange
  const onClickElement = () => {
    onClickRange(salaryRangeId)
  }
  return (
    <li className="checkbox-list-items" onClick={onClickElement}>
      <input
        type="radio"
        className="check-radio"
        id={salaryRangeId}
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId} className="check-label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentRange
