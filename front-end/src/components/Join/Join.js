import React , { useState} from 'react' 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Join = () => {
    const [room, setRoom] = useState('')
return(
    <div className="joinOuterContainer">
    <div className="joinInnerContainer">
      <h1 className="heading">Join</h1>
      <div>
        <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
      </div>
      <Link onClick={e => (!room) ? e.preventDefault() : null} to={`/chat?room=${room}`}>
        <button className={'button mt-20'} type="submit">Sign In</button>
      </Link>
    </div>
  </div>
)
}

const MapStateToProps = ({ user }) => {
    // console.log('*****', user.user.data.firstName)
  return {
    user
  }
}
export default connect(MapStateToProps)(Join);