import React, { useEffect, useState } from 'react';
import './signup.css';
import { signUp } from '../actions/auth';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import history from './history';

const LoginComponent = (props) => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async data => {
        const output = await props.signUp(data);
        if (output.isAuthenticated) {
            history.push('/trip');
        }

    }
    const [emailError, setEmailError] = useState(null)

    useEffect(() => {
        if (props.user.error) {
            setEmailError(props.user.error.message)
        }

        console.log('user changed', props.user);
    }, [props.user])

    return (
        <div className="signup-form mr-5 mt-5 bg-form">
            {/* <p className=""> {props.user.user ? `${props.user.user.data.firstName}, Welcome to devTransport` : 'Welcome'}</p> */}
            <p className="red"> {emailError ? 'Email already exist' : ''}</p>
            <form className="text-center border border-light p-3 shadow-lg " onSubmit={handleSubmit(onSubmit)}>

                <p className="h4 mb-4 text-info">LOGIN</p>
                <input ref={register({ required: 'Email is required' })} name="email" type="email" className="form-control mb-4" placeholder="E-mail.." />
                {errors.email && <p className="red mb-0">{errors.email.message}</p>}
                <input ref={register({ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 character' } })}
                    name="password" type="password" className="form-control mb-4" placeholder="password..." />

                {errors.password && <p className="red mb-0">{errors.password.message}</p>}
                <button className="btn btn-info btn-block" type="submit">Login
    </button>
                {/* <p>{ props.user.user? console.log('>>>>>>PROPS',props.user.user.data.lastName): 'nothing'}</p> */}
            </form>
        </div>
    )
}
const MapStateToProps = ({ user }) => {
    return {
        user
    }
}
export default connect(MapStateToProps, { signUp })(LoginComponent);