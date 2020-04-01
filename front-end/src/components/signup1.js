import React, { useState } from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import './signup.css';
import { signUp } from '../actions/auth';
import { connect } from 'react-redux';
import {useForm} from 'react-hook-form';

const SignupComponent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  // const [user, setUser] = useState({})

  const { register, handleSubmit } = useForm();
   const onSubmit = data => {
     console.log(data)
   }
  // const handleSignup = async () => {
  //      await props.signUp({
  //           firstName,
  //           lastName,
  //           email,
  //           password,
  //          status
  //       }); 
  // }
  return (
    // <div className='bg'>
    <div className="signup-form mr-5">
      <Form onSubmit = {handleSubmit(onSubmit)}>
        <h3 className='font-weight-bold text-center'>SIGN UP</h3>
        <FormGroup>
  <Label>First Name</Label>
          <input ref={register} name = "firstname"  type='text' placeholder='first name...'
            // value={firstName}
            // onChange={e => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input ref={register} name = "lastname" placeholder='last name...'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input ref={register} name = "email" type='email' placeholder='email...'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input ref={register} name = "password" type='password' placeholder='password...'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Status</Label>
        <Input ref={register} type="select" name="select" id="exampleSelect" value={status}
          onChange={e => setStatus(e.target.value)}>
          <option>Select...</option>
          <option>Passenger</option>
          <option>Driver</option>
        </Input>
      </FormGroup>
        <div className="text-center">
          <Button type="submit" className=" text-center btn btn-default">SIGN UP</Button>
        </div>
        <div>
          {
            props.user ? 'Signed up sucessfully' : 'Error'
          }
        </div>
      </Form>
    </div>
    // </div>
  )
}
const MapStateToProps = ({ user }) => {
  console.log(user)
  return {
    ...user
  }
}
export default connect(MapStateToProps, { signUp })(SignupComponent);