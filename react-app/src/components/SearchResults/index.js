import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { search } from "../../store/search"
import {useParams} from 'react-router-dom';


function SearchePage() {

    const searchResultsObj = useSelector((state)=>state.business)
 console.log(searchResultsObj, "resultsssssssssssssssss")

    return(

        <>
        {/* <p>{{ searched }}</p> */}
        <h2>searched</h2>

        </>
    )

}

export default SearchePage;
