import React, {useEffect, useState} from 'react';
import './signup.css';
import { signUp } from '../actions/auth';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import history from './history';

const SignupComponent = (props) => {

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
   const output =  await props.signUp(data);
    if (output.isAuthenticated){
      history.push('/dashboard');
    }
    
  }
const [emailError, setEmailError] = useState(null)

  useEffect(() => {
    if(props.user.error){
      setEmailError(props.user.error.message)
    }
    
    console.log('user changed', props.user);
}, [props.user]) 

  return (
    <div className="signup-form mr-5 bg-form">
      {/* <p className=""> {props.user.user ? `${props.user.user.data.firstName}, Welcome to devTransport` : 'Welcome'}</p> */}
  <p className="red"> { emailError ? 'Email already exist' : '' }</p>
      <form className="text-center border border-light p-3 shadow-lg " onSubmit={handleSubmit(onSubmit)}>

        <p className="h4 mb-4">SIGN UP</p>
        <input ref={register({ required: 'First name is required' })} name="firstName" type="text" className="form-control mb-1" placeholder="First name..." />
        {errors.firstName && <p className="red mb-0 ">{errors.firstName.message}</p>}
        <input ref={register({ required: 'Last name is required' })} name="lastName" type="text" className="form-control mb-1" placeholder="Last name..." />
  {errors.lastName && <p className="red mb-0">{errors.lastName.message}</p>}
        <input ref={register({ required: 'Email is required' })} name="email" type="email" className="form-control mb-1" placeholder="E-mail.." />
        {errors.email && <p className="red mb-0">{errors.email.message}</p>}
        <input ref={register({ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 character' } })}
          name="password" type="password" className="form-control mb-1" placeholder="password..." />

        {errors.password && <p className="red mb-0">{errors.password.message}</p>}

        <label>Status</label>
        <select ref={register({ required: true })} name="status" className="browser-default custom-select mb-4">
          <option disabled>Choose option</option>
          <option >Passenger</option>
          <option >Driver</option>
        </select>
        <button className="btn btn-info btn-block" type="submit">Sign up
    </button>
        {/* <p>{ props.user.user? console.log('>>>>>>PROPS',props.user.user.data.lastName): 'nothing'}</p> */}
      </form>
    </div>
  )
}
const MapStateToProps = ({user}) => {
  // console.log(state.user)
  return {
    user
  }
}
export default connect(MapStateToProps, { signUp })(SignupComponent);




// class SignupComponent extends Component{
//   render(){
//   const { register, handleSubmit, errors } = useForm();
//   const onSubmit = async data => {
//     await this.props.signUp(data);
//     // history.push('/dashboard');
//   }

//     return (
//           <div className="signup-form mr-5 bg-form">
//             <p className=""> {props.user.user ? `${props.user.user.data.firstName}, Welcome to devTransport` : 'Welcome'}</p>
//             <form className="text-center border border-light p-3 shadow-lg " onSubmit={handleSubmit(onSubmit)}>
      
//               <p className="h4 mb-4">SIGN UP</p>
//               <input ref={register({ required: 'First name is required' })} name="firstName" type="text" className="form-control mb-1" placeholder="First name..." />
//               {errors.firstName && <p className="red mb-0 ">{errors.firstName.message}</p>}
//               <input ref={register({ required: 'Last name is required' })} name="lastName" type="text" className="form-control mb-1" placeholder="Last name..." />
//               {errors.lastName && <p className="red mb-0">{errors.lastName.message}</p>}
//               <input ref={register({ required: 'Email is required' })} name="email" type="email" className="form-control mb-1" placeholder="E-mail.." />
//               {errors.email && <p className="red mb-0">{errors.email.message}</p>}
//               <input ref={register({ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 character' } })}
//                 name="password" type="password" className="form-control mb-1" placeholder="password..." />
      
//               {errors.password && <p className="red mb-0">{errors.password.message}</p>}
      
//               <label>Status</label>
//               <select ref={register({ required: true })} name="status" className="browser-default custom-select mb-4">
//                 <option disabled>Choose option</option>
//                 <option >Passenger</option>
//                 <option >Driver</option>
//               </select>
//               <button className="btn btn-info btn-block" type="submit">Sign up
//           </button>
//               {/* <p>{ props.user.user? console.log('>>>>>>PROPS',props.user.user.data.lastName): 'nothing'}</p> */}
//             </form>
//           </div>
//         )
//   }
// }
// export default connect(MapStateToProps, { signUp })(SignupComponent);