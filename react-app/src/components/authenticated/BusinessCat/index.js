import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, NavLink, Link } from 'react-router-dom'
import { getAllBusinessesCat } from '../../../store/business';




const BusinessCat = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const { business_id } = useParams()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
    console.log(businesses, "businesssssssssssss")


    const single = businesses.find(single => single.id === +3)


    const businessescat = useSelector(state => state.businessCatState.entries)
    console.log(businessescat, "businesss catttttttttttt")
    const singleCat = businessescat.find(single => single.id === +id)
    console.log(singleCat, "singleeeecatttttttt")

    const groomers = businessescat.filter(category => category.id === 3)

    const feed = Object.values(groomers)
    console.log(singleCat?.businesses, "feeeeeeedddddd")



    return (
        <div className='single-business-container'>
        <h2>Business Categories</h2>
        <>
        {singleCat?.businesses?.map (business => (
            <h1 className='test'>{business.name}</h1>
        )) }






        </>

    </div>



    )

}


export default BusinessCat;
