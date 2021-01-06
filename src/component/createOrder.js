import { React ,Component} from 'react'
class CreateOrder extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    id: "",
    name: "",
    price: "",
    description: "",
    error:{}
  }

  componentDidMount() {
    let updateId = this.props.match.params.id;
    this.setState({ id: updateId });
    if (updateId) {
      let orderItems = localStorage.getItem('items');
      console.log("update orderItems",orderItems);

      let arr = JSON.parse(orderItems);
      let obj = arr.find(o => o.id === parseInt(updateId));
      if (obj) {
        this.setState({
          id: obj.id,
          name: obj.name,
          price: obj.price,
          description:obj.description
         })
      }
      console.log("update objects",obj);
    }
  }
  
  handleUpdate = () => {
    let formValidate = this.validateForm();
    if (formValidate) {
      let items = localStorage.getItem('items');
      items = JSON.parse(items);
      
      let objIndex = items.findIndex((obj => obj.id == this.state.id));
      items[objIndex] = {
        id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
      }
      localStorage.setItem('items', JSON.stringify(items));
      alert("Order updated successfully");
    }
      
}
  handleAdd = () => {
      let formValidate = this.validateForm();
      if (formValidate) {
        let items = localStorage.getItem('items');
        items = JSON.parse(items);
        let lastID = 1;
        if (items.length) {
          lastID = items[ items.length - 1 ][ 'id' ]+1;
        }
        items.push(
          {
            id: lastID,
            name: this.state.name,
            price: this.state.price,
            description: this.state.description,
          }
        );
        localStorage.setItem('items', JSON.stringify(items));
        this.clearForm();
        alert("Order added successfully");
      }
  }
  clearForm = () => { 
    this.setState({
       name: "",
      price: "",
      description:""
      })
  }
  validateForm = () => {
     
    let isvalid = true;
    let errors = {};
    if (!this.state.name) {
      errors["name"] = "Name cannot be empty";
      isvalid = false;
    }
    if (!this.state.price) {
      errors["price"] = "Price cannot be empty";
      isvalid = false;
    }else {
      var regex = /^\d*(.\d{2})?$/;
      if (!regex.test(this.state.price)) {
        errors["price"] = "Please Price valid price";
        isvalid = false;
      }
    }
    if (!this.state.description) {
      errors["description"] = "Description cannot be empty";
      isvalid = false;
    }
    this.setState({error:errors})
    return isvalid;
  }
  render() {
    let {id,name,error,description,price} = this.state;
   
return <div className="createOrder">
          <div> 
    <div className="groupbox">
      <label className="label">Name</label>
      <div>
      <input type="text" 
                    value={name}
                      onChange={ (e) => { this.setState({ name: e.target.value }) } }
      />
      { error.name ? <p className="error">{error.name }</p>:null}
      </div>
    </div>
    <div className="groupbox">
      <label className="label">Price</label>
      <div>
      <input type="text" 
         value={price}
                    onChange={ (e) => { this.setState({ price: e.target.value }) } }
        />
        { error.price ? <p className="error">{error.price }</p>:null}
        </div>
    </div>
    <div className="groupbox">
      <label className="label">Description</label>
      <div>
        <textarea value={description} onChange={ (e) => { this.setState({ description: e.target.value }) } }></textarea>
        { error.description ? <p className="error">{error.description }</p>:null}
      </div>
    </div>
    <div className="groupbox">
      <label className="label"></label>
      {
        !id ? <button className="btn" onClick={ this.handleAdd }>Create Order</button>
          : <button className="btn" onClick={ this.handleUpdate }>Update Order</button>
      }
    </div>


          </div>
        </div>
  }
}
export default CreateOrder;