import React, {  useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import FormField from '../components/FormField'
import InputField from '../components/InputField'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import '../styles/signin-styles.css'

const Loginpage = (props) =>{
	const history = useHistory()
	const dispatch = useDispatch()
	const loader = useSelector( storeState => storeState.userState.loader)
	
	const[user, setUser] = useState({
		email : "",
		password : "",
		type : ''
	})
    
    const handleChange = (e) => {
		setUser({...user, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(user, history))
	}

	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

	return (
		<>
			<div className='login-form-container'>
				<FormField className='login-form' onSubmit={handleSubmit}>
					<InputField
						type="email"
						name="email"
						onChange={handleChange}
						value={user.email}
						placeholder="Email"
						required
					/>
					<InputField
						type="password"
						name="password"
						onChange={handleChange}
						value={user.password}
						placeholder="password"
						required
					/>
					<InputField type="submit" value="Login"/>
					{
                        loader && <Spin className="spinner" indicator={antIcon} />
                    }
					<p style={{ textAlign : "center", fontWeight : 500}}>new here? click <Link to='/signUp'>here</Link></p>
				</FormField>
				<img className='signin-image' src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/authentication_fsn5.svg" alt=""/>
			</div>
		</>
	);
}

export default  Loginpage;
