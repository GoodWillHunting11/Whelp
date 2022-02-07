import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import { editingBusiness } from '../../../store/business';
import * as sessionActions from '../../../store/session'

// Import pics
import bath from '../../../img/bath.png'
import stroller from '../../../img/stroller.png'
import walker from '../../../img/walker.png'

const EditBusinessForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
    const { id } = useParams()
    const single = businesses.find(single => single.id === +id)
    console.log(single)

    if (single) {
        localStorage.setItem('name', single.name)
        localStorage.setItem('address', single.address)
        localStorage.setItem('city', single.city)
        localStorage.setItem('state', single.state)
        localStorage.setItem('zipcode', single.zipcode)
        localStorage.setItem('phone', single.phone)
        localStorage.setItem('website', single.website)
        localStorage.setItem('category', single.categories[0]?.category)
    }

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(localStorage.getItem('name'))
    const [address, setAddress] = useState(localStorage.getItem('address'))
    const [city, setCity] = useState(localStorage.getItem('city'))
    const [state, setState] = useState(localStorage.getItem('state'))
    const [zipcode, setZipcode] = useState(localStorage.getItem('zipcode'))
    const [phone, setPhone] = useState(localStorage.getItem('phone'))
    const [website, setWebsite] = useState(localStorage.getItem('website'))
    const [category, setCategory] = useState(localStorage.getItem('category'))


    const handleUpload = async (e) => {
        e.preventDefault()

        const updatedBiz = await dispatch(editingBusiness(id, name, address, city, state, zipcode, phone, website, category))

        if(updatedBiz.errors) {
            setErrors(updatedBiz.errors)
        }
        else if (!updatedBiz.errors) {
            history.push(`/businesses/${updatedBiz.id}`)
        }

    }

    if(!single) {
        return (
            <h1 className='roll-heading'>Whelp! There's nothing here.</h1>
        )
    }

    return (
        <div className='new-business-form-container'>
            <form onSubmit={handleUpload}>
                <h1 className='new-business-h1'>Edit {single?.name}</h1>
                <p className='new-business-p'>Make your edits and tap the save button!</p>
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
                            <button className='add-business-button' type='submit'>Save Edits</button>
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

export default EditBusinessForm
