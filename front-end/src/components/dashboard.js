import React from 'react';
import { connect } from 'react-redux';

const Dashboard = (props) => {
    const firstName = props.user.user.data.firstName;

    return(
        <div>
             <p className="mr-5 mt-5 text-center"> { `${firstName}, Welcome to devTransport`}</p>
    {/* <p>{console.log(props)}</p> */}
        </div>
    )
}
const MapStateToProps = ( {user}) => {
    // console.log(user)
    return {
      user
    }
}
export default connect(MapStateToProps)(Dashboard);