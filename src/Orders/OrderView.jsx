import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {ORDER_UPDATE_ENDPOINT, ORDER_ITEM_LIST_CREATE_ENDPOINT, PRODUCT_LIST_ENPOINT} from '../GenericView/constants'
import {lookupOptionsWithToken} from '../GenericView/tools';
import Navbar from '../GenericView/Navbar';
import {Container, Header, GridColumn, GridRow} from 'semantic-ui-react';
import {ProductView} from './Components';


class OrderView extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            token: localStorage.getItem('token'),
            order: null,
            order_items: [],
            products: [],
            doneLoading: false
        }
    }

    loadProducts(search_name) {
        const {token} = this.state;
        const thisComp = this;
        let endpoint = PRODUCT_LIST_ENPOINT
        if (search_name.length > 0 ) {
            endpoint = PRODUCT_LIST_ENPOINT + '?q=' + search_name
        }
        fetch(endpoint, lookupOptionsWithToken(token))
        .then(resp=>resp.json())
        .then(respData => {
            thisComp.setState({
                products: respData.results
            })
        })
    }

    loadOrder(id) {
        const token = this.state.token;
        const thisComp = this;
        fetch(ORDER_UPDATE_ENDPOINT + id +'/', lookupOptionsWithToken(token))
        .then(resp=>resp.json())
        .then(respData => {
            thisComp.setState({
                order:respData
            })

        })
    }

    loadOrderItems = (id) => {
        const token = this.state.token;
        const thisComp = this;
        const createUrl = ORDER_ITEM_LIST_CREATE_ENDPOINT + '?order=' + id;
        fetch(createUrl,  lookupOptionsWithToken(token))
        .then(resp=>resp.json())
        .then(respData => {
            thisComp.setState({
                order_items: respData.results,
                doneLoading: true
            })
        })
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.loadOrder(id);
        this.loadOrderItems(id);
      
    }

    render() {
        const {order, doneLoading, products} = this.state;
        return (
            <div>
        <Navbar />
        <Container style={{ marginTop: '7em' }}>
            {doneLoading ? 
                <Header as='h1'>{order.title} - Date {order.date_expired}</Header>:<p>No data</p> }
            <GridRow>
                <GridColumn>
                    <ProductView products={products} handleSearch={this.loadProducts} />
                </GridColumn>
                <GridColumn>
                    
                </GridColumn>
            </GridRow>
            
         
        </Container>
      </div>
        )
    }
}


export default withRouter(OrderView);