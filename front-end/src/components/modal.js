import React, { Component} from 'react';
import { Button, Modal } from 'react-bootstrap';
import {deleteTrips} from '../actions/tripActions';
import { connect } from 'react-redux'

class Modalpop extends Component {
    state = {
        show: false,
        message: '',
    }
handleModal(){
    this.setState({
    show: !this.state.show
})
}
// componentWillReceiveProps(nextProps) {
//     if (nextProps.trips !== this.props.trips) {
//         console.log('count changed', nextProps.trips);
//     }
// }
// async componentDidMount() {
//      await deleteTrips(102)
//     // console.log(okay)
// }
async handleDelete (){
    const findTrip = this.props.trips.data.filter( trip => trip.id )
    console.log('FIND TRIP', findTrip)
    const indexOfTrip = this.props.trips.data.indexOf(findTrip)
    console.log('INDEX OF TRIP: ___', indexOfTrip)

    const output = await this.props.deleteTrips(findTrip[0].tripId, this.props.trips)
    // console.log('OUTPUT DELETE', output)
    // if(output.payload.status === 200){
    //     this.setState({
    //         message: 'The Trip deleted successfully'
    //     })
    // }
    this.handleModal()
}
    render(){
        return(
            <div className='mt-5'>
                <Button className='bg-danger' onClick = {()=> this.handleModal()}>Cancle</Button>
                <Modal size={'sm'} animation={true} className ='mt-5 float-right' show={this.state.show} >
                    <Modal.Header className='text-danger'> Attetion! </Modal.Header>
                    <Modal.Body>Are sure you want to cancel this trip?</Modal.Body>
                    <Modal.Footer>
                        <Button onClick = {()=> this.handleModal()} className='bg-info'>No</Button>
                        <Button onClick = {()=> this.handleDelete()} className='bg-danger'>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
const MapStateToProps = ({ trips, user }) => {
    console.log('MODALLLLL_____', trips)
    return {
      trips,
      user
    }
  }
export default connect(MapStateToProps,{deleteTrips})(Modalpop);