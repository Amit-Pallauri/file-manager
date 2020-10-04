import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
import FormField from '../components/FormField'
import InputField from '../components/InputField'

import '../styles/signup-styles.css'
import DropdownField from '../components/DropdownField';
import { Link, useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const RegisterPage = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	const loader = useSelector(storeState => storeState.userState.loader )
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		type : ''	
	})
    
    const handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value })
	}

    const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(registerUser(user, history))	
	}

	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

	return (
		<>
			<div className='register-form-container'>
				<FormField className='register-form'  onSubmit={handleSubmit}>
				<DropdownField className='drop-down' onChange={ e => setUser({...user, type : e.target.value})} required/>
					<InputField
						type="text"
						name="name"
						onChange={handleChange}
						value={user.name}
						placeholder="Enter Name"
						required
					/>
					<InputField
						type="email"
						name="email"
						onChange={handleChange}
						value={user.email}
						placeholder="Enter your email"
						required
					/>
					<InputField
						type="password"
						name="password"
						onChange={handleChange}
						value={user.password}
						placeholder="Enter password"
						required
					/>
					<InputField type="submit" value="Register"/>
					{
                        loader && <Spin className="spinner" indicator={antIcon} />
                    }
					<p style={{ textAlign : "center", fontWeight : 500}}>already registered? click <Link to='/signIn'>here</Link></p>
				</FormField>
				<img className='signup-image' src='https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/sign_in_e6hj.svg' alt="signUp"/>
			</div>
		</>
	);
}

export default RegisterPage;
