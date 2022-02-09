import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import BusinessRoll from '../BusinessRoll'

import './SearchBusiness.css'


const SearchBusiness = () => {
    const { id } = useParams()
    const businesses = useSelector(state => state.businessState.entries)

    function stringBiz(arrObj) {
        let newArr = []
        for(let i = 0; i < arrObj.length; i++){
            const newString = `${arrObj[i].address.toLowerCase()}${arrObj[i].city.toLowerCase()}${arrObj[i].name.toLowerCase()}${arrObj[i].zipcode.toLowerCase()}`
            newArr.push(newString)
        }
        return newArr
    }

    const stringBizList = stringBiz(businesses)

    function findBiz(bizArray){
        let businessIndexes = []
        for(let i = 0; i < bizArray.length; i++){
            let oneString = bizArray[i]
            if(oneString.includes(id.toLowerCase())){
                businessIndexes.push(i)
            }
        }
        return businessIndexes
    }

    const businessIndexes = findBiz(stringBizList)
    console.log('biz indexes',businessIndexes)

    function finalArrOfBiz(indexArr, businesses){
        let finalArr = []
        for(let i = 0; i < indexArr.length; i++){
            let index = indexArr[i]
            finalArr.push(businesses[index])
        }
        return finalArr
    }

    const searchRes = finalArrOfBiz(businessIndexes, businesses)
    console.log('Final Result', searchRes)

    if(searchRes.length){

        return(

            <div className='search-res-container'>
                <div className="search-title-container">
                    <h1 className="search-stream-title">Search Results For: <span className="search-subtitle">{`"${id}"`}</span></h1>
                </div>
                <div className='business-roll'>
                    {searchRes.map((biz) => (
                        <BusinessRoll key={biz.id} biz={biz} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='search-res-container'>
            <div className="no-search-title-container">
                <h1 className="no-search-stream-title">No Search Results For: <span className="no-search-subtitle">{`"${id}"`}</span></h1>
            </div>
        </div>
    )
}


export default SearchBusiness
