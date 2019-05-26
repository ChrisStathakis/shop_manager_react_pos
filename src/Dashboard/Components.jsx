import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import  { Redirect, Link } from 'react-router-dom'
import {ORDER_UPDATE_ENDPOINT} from '../GenericView/constants'


class OrderTable extends Component {

  handleEditOrder = (id) => {
      const new_url = ORDER_UPDATE_ENDPOINT + id + '/';

    }

    render() {
        const orders = this.props.orders
        return (
            <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Ημερομηνία</Table.HeaderCell>
                <Table.HeaderCell>Τιτλος</Table.HeaderCell>
                <Table.HeaderCell>Ποσό</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {orders.map((item)=>
                <TableItem item={item} handleEditOrder={this.handleEditOrder} />
              )}
            </Table.Body>
          </Table>
        )
    }
}



class TableItem extends Component {

  editOrder = () => {
    this.props.handleEditOrder(this.props.item.id)
  }

  render() {
    const item = this.props.item;

    return (
      <Table.Row>
        <Table.Cell>{item.date_expired}</Table.Cell>
        <Table.Cell>{item.title}</Table.Cell>
        <Table.Cell>{item.tag_final_value}</Table.Cell>
        <Table.Cell>
          <Link to={`/orders/${item.id}`}>
            <Button primary >Go</Button>
          </Link>
          </Table.Cell>
      </Table.Row>
    )
  
  }
}

export default OrderTable;