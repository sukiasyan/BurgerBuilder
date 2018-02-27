import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };
    orderHandler = (event)=> {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Hakob Sukiasyan',
                address: {
                    street: 'Svachyan',
                    zipCode: '0034',
                    country: 'Armenia'
                },
                email: 'test@tast.com'
            }

        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });

    };

    render() {
        let form = (
            <form>
                <input type="text" className={classes.Input} name="name" placeholder="Your name"/>
                <input type="text" className={classes.Input} name="email" placeholder="Your email"/>
                <input type="text" className={classes.Input} name="street" placeholder="Street"/>
                <input type="text" className={classes.Input} name="postal" placeholder="Zip"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>enter your Contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;