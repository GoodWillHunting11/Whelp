import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom';
import { getAllBusinesses, newBusiness } from '../../../store/business';
import * as sessionActions from '../../../store/session'
import './NewBusinessForm.css'

const NewBusinessForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
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
        (async() => {
          await dispatch(sessionActions.authenticate())
          await dispatch(getAllBusinesses())

        })();
      }, [dispatch]);

    const handleUpload = async (e) => {
        e.preventDefault()

        const newBiz = await dispatch(newBusiness(name, address, city, state, zipcode, phone, website, category))

        if(newBiz.errors) {
            setErrors(newBiz.errors)
        }
        else if (!newBiz.errors) {
            history.push('/')
        }

    }

    return (
        <div>
            <form onSubmit={handleUpload}>
            <div >
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
                <div>
                    <label>
                        <input
                            type='text'
                            value={name}
                            onChange={ e => setName(e.target.value) }
                            required
                            placeholder='Business Name'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type='text'
                            value={address}
                            onChange={ e => setAddress(e.target.value) }
                            required
                            placeholder='Address'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type='text'
                            value={ city }
                            onChange={ e => setCity(e.target.value) }
                            required
                            placeholder='City'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type='text'
                            value={ state }
                            onChange={ e => setState(e.target.value) }
                            required
                            placeholder='State'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type='text'
                            value={ zipcode }
                            onChange={ e => setZipcode(e.target.value) }
                            required
                            placeholder='Zipcode'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type='text'
                            value={ phone }
                            onChange={ e => setPhone(e.target.value) }
                            required
                            placeholder='Phone Number'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type='text'
                            value={ website }
                            onChange={ e => setWebsite(e.target.value) }
                            required
                            placeholder='Website'
                        />
                    </label>
                </div>
                <div>
                    <select value={category} onChange={ e => setCategory(e.target.value)}>
                        <option value="Parks">Parks</option>
                        <option value="Groomers">Groomers</option>
                        <option value="Pet Stores">Pet Stores</option>
                        <option value="Veterinarians">Veterinarians</option>
                        <option value="Walker">Walker</option>
                    </select>
                </div>
                <div>
                        <button type='submit'>Upload</button>
                </div>
            </form>
        </div>
    )
}

export default NewBusinessForm
