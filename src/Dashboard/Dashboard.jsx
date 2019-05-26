import React from 'react';
import {withRouter} from 'react-router-dom'
import {
  Container,
  Header,
  GridRow,
  Button
} from 'semantic-ui-react';
import {Redirect} from 'react-router'
import Navbar from '../GenericView/Navbar';
import {ORDER_LIST_ENDPOINT, ORDER_CREATE_ENDPOINT} from '../GenericView/constants';
import {lookupOptionsWithToken, lookupOptionPOST} from '../GenericView/tools';
import OrderTable from './Components';

class Dashboard extends React.Component{

  
  constructor(props) {
    super(props);
    
    this.handleNewOrder = this.handleNewOrder.bind(this)
    this.state = {
      orders: [],
      token: localStorage.getItem('token'),
      doneLoading: false
    }
  }
  
  loadOrders() {
    const thisComp = this;
    const token = this.state.token;
    fetch(ORDER_LIST_ENDPOINT, lookupOptionsWithToken(token))
        .then(resp=>resp.json())
        .then(respData=>{
            thisComp.setState({
                orders: respData.results,
                doneLoading: true
            })
        })
  }

  handleNewOrder(event) {
    event.preventDefault();
    const thisComp = this;
    const token = this.state.token;
    const csrf_token = localStorage.getItem('csrf_token');
    const data = {
      title: 'New Order',
    }
    fetch(ORDER_CREATE_ENDPOINT,  lookupOptionPOST(token, csrf_token, data))
    .then(resp=> resp.json())
    .then(
      responseData=>{
        const new_id = responseData.id;
        console.log('works', new_id)
      }
    )
  }

  componentDidMount() {
    this.loadOrders()
  }

  render() {
    const {orders, doneLoading} = this.state;
    console.log(orders)
    return (
      <div>
        <Navbar />
        <Container style={{ marginTop: '7em' }}>
          <Header as='h1'>Works!</Header>
          <GridRow>
            <Button primary onClick={this.handleNewOrder}>Νέα Παραγγελία</Button>
          </GridRow>
          {doneLoading ?
          <OrderTable orders={orders} />
          :
          <p>No data</p>}
        </Container>
      </div>
    )
  }
}


export default withRouter(Dashboard)