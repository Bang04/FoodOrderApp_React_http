import classes from './Checkout.module.css';
import { useRef , useState} from 'react';

const isEmpty = value => value.trim() === '';
const  isFiveChars = value => value.trim().length !== 5;

const Checkout = (props) =>{
    const [formInputsValidity, setFormInputsValidity ] = useState({
        name : true,
        street : true, 
        city : true,
        postalCode : true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    

    const confirmHandler = (event) =>{
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
 
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode);
        const enteredCityIsValid = !isFiveChars(enteredCity);
        
        setFormInputsValidity({
            name : enteredNameIsValid,
            street : enteredStreetIsValid , 
            city : enteredCityIsValid,
            postalCode : enteredPostalCodeIsValid
        });

        const formIsValid =
          enteredNameIsValid &&
          enteredPostalCodeIsValid &&
          enteredStreetIsValid &&
          enteredCityIsValid;

          if(formIsValid){
            return;
          }


    }

    const nameControlCasses =  `${classes.control} ${
        formInputsValidity.name ? "" : classes.invalid
      }`;

      const streetControlCasses =  `${classes.control} ${
        formInputsValidity.street ? "" : classes.invalid
      }`;
      const postalCodeControlCasses =  `${classes.control} ${
        formInputsValidity.postalCode ? "" : classes.invalid
      }`;
      const cityControlCasses =  `${classes.control} ${
        formInputsValidity.city ? "" : classes.invalid
      }`;

    return (
      <form onSubmit={confirmHandler}>
        <div className={nameControlCasses}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={streetControlCasses}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formInputsValidity.street && <p>Please enter a valid street!</p>}
        </div>
        <div className={postalCodeControlCasses}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalCodeInputRef} />
          {!formInputsValidity.postalCode && (
            <p>Please enter a valid postal code (5 characters long)!</p>
          )}
        </div>
        <div className={cityControlCasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formInputsValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.action}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button>Confirm</button>
        </div>
      </form>
    );
}

export default Checkout;