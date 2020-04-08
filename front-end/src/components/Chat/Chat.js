import React , { useState, useEffect} from 'react' 
import { connect } from 'react-redux';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;
const ENDPOINT = 'localhost:4000';

const Chat = ({location, user }) => {
    const [room, setRoom ] = useState('')
    const [message, setMessage ] = useState('')
    const [messages, setMessages ] = useState([])

    useEffect(()=>{
        const { room } = queryString.parse(location.search)
        setRoom(room);

        socket = io(ENDPOINT);

        socket.emit('join', { name: user.user.data.firstName, room }, ( error)=>{
            if(error){
                alert(error)
            }
        })

    return () =>  {
        socket.emit('disconnect');
        socket.off();
    }

    },[ENDPOINT, location.search])

    useEffect(()=>{
        socket.on('message', (message) => {
            console.log('WHAT____', message)
            setMessages([ ...messages, message ]);
          });
        },[messages]);
        
        console.log('*******',messages)

        const sendMessage = (event) => {
            event.preventDefault();
            
            // if(message) {
                socket.emit('sendMessage', message, () => setMessage(''));
            // }
      }
      console.log('***@@@@@@****',messages)

    
return(
    <div className="mt-5 ml-5">
      <div className="mt-5 ml-5">
<p className=" mb-5">{room}</p>
{
    messages.map((mess, index)=>(
            <di key={index}>
      <p className="text-dark ml-5 bg-info rounded-circle rounded-sm w-25 text-center" >{mess.user}</p>          
<p className='bg-primary text-white text-center rounded-pill'>{mess.text}<span className='text-dark pl-2 pr-2'>{new Date().toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
})}</span></p>

            </di>
     ) )
}
{/* <p className="mt-5">{messages}</p> */}
{/* <input type="text" value={message}
 onChange={(event)=> setMessage(event.target.value)}
  onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null /> */}

          {/* <InfoBar room={room} /> */}
          {/* <Messages messages={messages} name={name} /> */}
     {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
     <input
      className="mt-5"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
)
}

const MapStateToProps = ({ user }) => {
    // console.log('*****chat user', user.user.data)
  return {
    user
  }
}
export default connect(MapStateToProps)(Chat);