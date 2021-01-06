import { React, Component } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CreateOrder extends Component {
    state = {
        orders:[]
    }
    componentDidMount() {
        let items = localStorage.getItem('items');
        console.log(items);
        items = JSON.parse(items);
        this.setState({orders:items});
    }
    deleteOrder = (index) => {
        if (!window.confirm("Are you sure to delete")) {
            return false
        }
        let orderList = this.state.orders;
        orderList.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(orderList));
        this.setState({orders:orderList});
    }
  render() {

    let {orders} = this.state;
return <div className="listOrder">
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th> Name</th>
                <th>Price</th>
                <th>Description</th>
                            <th>Operation  </th>
                </tr>
                </thead>
                        <tbody>
                            {   orders.length?
                                orders.map((item,key) => {
                                    return <tr key={ key}>
                                    <td>{ item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{ item.price}</td>
                                    <td>{ item.description}</td>
                                    <td>
                                        <ul> 
                                            <li> <Link to={`update/${item.id}`}>Update</Link></li> 
                                            <li onClick={ ()=>this.deleteOrder(key)}>Delete</li>
                                        </ul>                        
                                    </td>
                                    </tr>
                                })
                                :
                                <tr>
                                    <td colSpan="5" style={ { textAlign: 'center' } }> No order found </td>
                                </tr>
                            }
                </tbody>
        </Table>
        </div>
  }
}
export default CreateOrder;


