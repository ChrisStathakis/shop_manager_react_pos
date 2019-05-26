import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {ORDER_UPDATE_ENDPOINT, ORDER_ITEM_LIST_CREATE_ENDPOINT} from '../GenericView/constants'
import {lookupOptionsWithToken} from '../GenericView/tools';


class OrderView extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            token: localStorage.getItem('token'),
            order: null,
            order_items: [],
            doneLoading: false
        }
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
        console.log(this.props.match.params)
        const {id} = this.props.match.params
        this.loadOrder(id);
      
    }

    render() {

        return (
            <p>Works!</p>
        )
    }
}


export default withRouter(OrderView);