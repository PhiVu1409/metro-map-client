import React from 'react'
import InfoTrain from './listTrainById'
import {Link} from 'react-router-dom'

export default function BodyLeftInfoTrain() {
  return (
    <div className='bodyLeft'>
        <div className='map-info'>
            <div className='info-list-train'>
                <div className='button-exit'>
                    <Link to= {'/'}>{"<"}Trở lại</Link>
                </div> 
                <h2>Danh sách ga</h2>
                    <InfoTrain/>
            </div>
        </div>
    </div>
  )
}
