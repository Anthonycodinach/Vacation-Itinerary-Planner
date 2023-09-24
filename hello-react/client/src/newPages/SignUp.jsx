import React, { useState } from 'react'
import { Link, BrowserRouter } from 'react-router-dom';
import './SignUp.css'
import { useMutation } from '@apollo/client';
import {ADD_USER, LOGIN_USER} from '../../src/utils/mutations';
import Auth from '../utils/auth';


const Signup = () => {

    const [newUser, setnewUser] = useState({
        username: '',
        password: '',
        email: ''
    });

    const [loginUser, setloginUser] = useState({
        username: '',
        password: '',
    });

    const [addUser] = useMutation(ADD_USER);

    const handleInputChangenewUser = (e) => {
        const { name, value } = e.target
        setnewUser({
            ...newUser,
            [name]: value,});
    }

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        // console.log('Register Click');        
        try {
            //console.log(newUser);
            const { data } = await addUser({
              variables: { ...newUser },
              
            });
        //console.log(data);    
        Auth.login(data.addUser.token);
        window.location.assign(`/Profile/${newUser.username}`);
        } 
        catch (e) { console.error(e);
        }
    }

    

    const [userLogin, { error, data }] = useMutation(LOGIN_USER)
    
    const handleInputChangeloginUser = (e) => {
        const { name, value } = e.target
        setloginUser({
            ...loginUser,
            [name]: value,})
            
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        //console.log('Login Click')
        try {
            const { data } = await userLogin({
              variables: { ...loginUser },
            });
            //console.log(data);
            Auth.login(data.login.token);
            
          } catch (e) {
            console.error(e);
          }
          window.location.assign(`/Profile/${loginUser.username}`);
    }

    return (
        <>
            <div className='signupLoginMain'>
                <div className='signupLoginSub'>
                    <h2 className='signupLoginTitle'>Login</h2>
                    <form>
                    <div className='formSub'>
                            <input 
                            className='formSubInput' 
                            placeholder='Username' 
                            type="text"
                            name = "username"
                            onChange={handleInputChangeloginUser}
                            value= {loginUser.username}
                            />
                        </div>
                        <div className='formSub'>
                            <input 
                            className='formSubInput' 
                            placeholder='Password' 
                            type="password"
                            name="password"
                            onChange={handleInputChangeloginUser}
                            value={loginUser.password}
                            />
                        </div>
                        <div className='formSub'>
                            <button 
                            className='formSubButton' 
                            type="submit"
                            name = {loginUser.username}
                            onClick = {handleLoginSubmit}
                            >Login</button>
                        </div>
                    </form>
                </div>
                <div className='signupLoginSub'>
                    <h2 className='signupLoginTitle'>Signup</h2>
                    <form>
                        <div className='formSub'>
                            <input 
                            className='formSubInput' 
                            placeholder='Username' 
                            type="text"
                            name="username"
                            onChange={handleInputChangenewUser}
                            value={newUser.username}
                            />
                        </div>
                        <div className='formSub'>
                            <input 
                            className='formSubInput' 
                            placeholder='Password' 
                            type="password"
                            name="password"
                            onChange={handleInputChangenewUser}
                            value={newUser.password}
                            />
                        </div>
                        
                        <div className='formSub'>
                            <button 
                            className='formSubButton' 
                            type="submit"
                            onClick = {handleSignUpSubmit}>Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup