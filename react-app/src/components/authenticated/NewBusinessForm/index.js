import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { newBusiness } from '../../../store/business';


// Import pics
import bath from '../../../img/bath.png'
import stroller from '../../../img/stroller.png'
import walker from '../../../img/walker.png'

import './NewBusinessForm.css'

const NewBusinessForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [category, setCategory] = useState("Parks");

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    const handleUpload = async (e) => {
        e.preventDefault()

        const newBiz = await dispatch(newBusiness(name, address, city, state.toUpperCase(), zipcode, phone, website, category))

        if(newBiz.errors) {
            setErrors(newBiz.errors)
        }
        else if (!newBiz.errors) {
            // await fetch('/api/maps/new', {
            //     method: "POST",
            //     headers: {
            //         "content-type":"application/json"
            //     },
            //     body: JSON.stringify({
            //         id : newBiz.id,
            //         address: newBiz.address + ' ' + newBiz.city + ' ' + newBiz.state + ' ' + newBiz.zipcode
            //     })
            // });


            history.push(`/businesses/${newBiz.id}`)
        }

    }

    return (
        <div className='new-business-form-container'>
            <form onSubmit={handleUpload}>
                <h1 className='new-business-h1'>Add a new business to Whelp!</h1>
                <p className='new-business-p'>Before adding a new business, have you tried searching to see if it is already on Whelp?</p>
                <div >
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                    <div>
                        <label className='new-business-label'> Business Name
                            <input
                                className='new-business-input'
                                type='text'
                                value={name}
                                onChange={ e => setName(e.target.value) }
                                required
                                placeholder='Business Name'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='new-business-label'> Street Address
                            <input
                                className='new-business-input'
                                type='text'
                                value={address}
                                onChange={ e => setAddress(e.target.value) }
                                required
                                placeholder='Address'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='new-business-label'> City
                            <input
                                className='new-business-input'
                                type='text'
                                value={ city }
                                onChange={ e => setCity(e.target.value) }
                                required
                                placeholder='City'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='new-business-label'> State (two letter state)
                            <input
                                className='new-business-input'
                                type='text'
                                value={ state }
                                onChange={ e => setState(e.target.value) }
                                required
                                placeholder='State'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='new-business-label'> Zipcode (five digits, example: 30075)
                            <input
                                className='new-business-input'
                                type='text'
                                value={ zipcode }
                                onChange={ e => setZipcode(e.target.value) }
                                required
                                placeholder='Zipcode'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='new-business-label'> Phone Number (no symbols or special characters, example: 1234567890)
                            <input
                                className='new-business-input'
                                type='text'
                                value={ phone }
                                onChange={ e => setPhone(e.target.value) }
                                required
                                placeholder='Phone Number'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='new-business-label'> Website URL (please include http:// or https://)
                            <input
                                className='new-business-input'
                                type='text'
                                value={ website }
                                onChange={ e => setWebsite(e.target.value) }
                                required
                                placeholder='Website'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='new-business-label'> Choose a Category
                            <select className='new-business-select' value={category} onChange={ e => setCategory(e.target.value)}>
                                <option  value="Parks">Parks</option>
                                <option value="Groomers">Groomers</option>
                                <option value="Pet Stores">Pet Stores</option>
                                <option value="Veterinarians">Veterinarians</option>
                                <option value="Walkers">Walkers</option>
                            </select>
                        </label>
                    </div>
                    <div>
                            <button className='add-business-button' type='submit'>Add Business</button>
                    </div>
            </form>
            <div className='add-business-pics'>
                <img className='icon-pics' src={bath} alt='Puppy bath' />
                <img className='icon-pics' src={walker} alt='Puppy on a leash'/>
                <img className='icon-pics' src={stroller} alt='Puppy in a stroller'/>
            </div>
        </div>
    )
}

export default NewBusinessForm
