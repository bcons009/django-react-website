import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editULocation, getULocations } from '../../actions/user-locations';
import { Redirect } from "react-router-dom";
import { WithContext as ReactTags } from 'react-tag-input';
import '../css/ReactTags.css'

// commas and enter separate tag inputs
const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

let tags = "|";

export class EditEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            user: "",
            name: "",
            address: "",
            city: "",
            zip_code: "",
            latitude: 0.0,
            longitude: 0.0,
            description: "",
            date: "",
            start_time: "",
            end_time: "",
            email: "",
            phone_number: "",
            onClickId: props.location.id,
            is_loading: false,
            tags: [],
            suggestions: [
                { id: 'Produce', text: 'Produce' },
                { id: 'Pantry Staples', text: 'Pantry Staples' },
                { id: 'Eggs', text: 'Eggs' },
                { id: 'Dairy', text: 'Dairy' },
                { id: 'Canned Goods', text: 'Canned Goods' },
                { id: 'Bread', text: 'Bread' },
                { id: 'Meat', text: 'Meat' },
                { id: 'Rice', text: 'Rice' },
                { id: 'Sweets', text: 'Sweets' },
                { id: 'Holiday', text: 'Holiday' },
                { id: 'Baby Supplies', text: 'Baby Supplies' },
                { id: 'Cleaning Supplies', text: 'Cleaning Supplies' },
                { id: 'Hot Meals', text: 'Hot Meals' },
                { id: 'Open Once a Week', text: 'Open Once a Week' },
                { id: 'Open Multiple Days a Week', text: 'Open Multiple Days a Week' },
                { id: 'Irregular Schedule', text: 'Irregular Schedule' },
            ],
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        editULocation: PropTypes.func.isRequired,
        getULocations: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getULocations();
        // some function that runs after getULocations that sets the state to the values
        // of each input field to the record whose ID matches the event ID passed in

        const { isAuthenticated } = this.props.auth;
        if (isAuthenticated) {
            const eULocation = this.props.uLocations.find(location => location.id === this.state.onClickId);

            // split address
            const addr = eULocation.address.split(",");

            // split tags
            const tags_str = eULocation.tags.replace(/^\|+|\|+$/g, '');
            const tags_arr = tags_str.split("||");

            tags_arr.forEach(tag => {
                this.setState(prevState => ({
                    tags: [...prevState.tags, { id: tag, text: tag }]
                }))
            });
        
            this.setState({
                name: eULocation.name,
                address: addr[0],
                city: addr[1].trim(),
                zip_code: addr[2].trim(),
                latitude: eULocation.latitude,
                longitude: eULocation.longitude,
                description: eULocation.description,
                date: eULocation.date,
                start_time: eULocation.start_time,
                end_time: eULocation.end_time,
                email: eULocation.email,
                phone_number: eULocation.phone_number,
            });
        }
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }

    dateMin = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;    // January is 0!
        let yyyy = today.getFullYear();
        if(dd<10){
                dd = '0' + dd
            } 
            if(mm<10){
                mm = '0' + mm
            } 

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    dateMax = () => {
        let today_y = new Date();
        let dd = today_y.getDate();
        let mm = today_y.getMonth() + 1;    // January is 0!
        let yyyy = today_y.getFullYear() + 1;
        if(dd<10){
                dd = '0' + dd
            } 
            if(mm<10){
                mm = '0' + mm
            } 

        today_y = yyyy + '-' + mm + '-' + dd;
        return today_y;
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    onDateChange = e => {
        const date = new Date(e.target.value);

        const today = this.dateMin();
        const today_d = new Date(today);
        const today_y = this.dateMax();
        const today_yd = new Date(today_y)

        if (today_d.getTime() <= date.getTime() && date.getTime() <= today_yd.getTime()) {
            this.setState({ date: e.target.value })
        }
        else {
            if (date.getTime() < today_d.getTime()) {
                this.setState({ date: today })
            }
            else if (date.getTime() > today_yd.getTime()) {
                this.setState({ date: today_y })
            }
            else {
                this.setState({ date: e.target.value })
            }
        }
    }

    validateInputs = () => {
        const { name, address, city, zip_code, date, start_time, end_time, description, email, phone_number } = this.state;
        if (!name || !address || !city || !zip_code || !date || !start_time || !end_time || !description || !email || !phone_number) {
            return false;
        }
        else {
            return true;
        }
    }

    addToStr = obj => {
        tags += "|" + obj.text + "|";
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.validateInputs()) {
            this.setState({is_loading: true});
            this.setState({hover: false});

            let { user } = this.props.auth;
            user = user.id
            this.setState({user: user});

            // formatting address for use in API call url
            let addr = this.state.address + ", " + this.state.city + ", " + this.state.zip_code;
            this.setState({address: addr});
            addr = addr.replace(/ /g, "%20");
            addr = addr.replace(/,/g, "%2C");

            // combine tags into one string
            this.state.tags.forEach(this.addToStr);
            tags += "|";
            // console.log(tags);

            // make geocode API call for lat/long
            const url_s = 'http://api.positionstack.com/v1/forward?access_key=2de14d5ec4835742c7b6d339ab0b4e29&query=' + addr;
            console.log(url_s);
            fetch(url_s)
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    
                    this.setState({ 
                        latitude: response['data'][1]['latitude'],
                        longitude: response['data'][1]['longitude'] 
                    });
                    const { name, address, latitude, longitude, date, start_time, end_time, description, email, phone_number } = this.state;

                    if (25.3 <= latitude && latitude <= 26.8 && -80.6 <= longitude && longitude <= -80.0) {
                        const uLocation = { user, name, address, latitude, longitude, date, start_time, end_time, description, email, phone_number, tags };
                    
                        this.props.editULocation(uLocation, this.state.onClickId);
                        console.log(uLocation);

                        alert("Event has been successfully updated!");

                        // redirect
                        window.location.href = '#';
                    }
                    else {
                        alert("Error: Event address is not within South Florida.");
                    }                    
                })
                .catch(err => alert(err));
        }
        else {
            alert("Please make sure to fill out all fields before submitting.");
        }            
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { name, address, city, zip_code, date, start_time, end_time, description, email, phone_number } = this.state;   
        const { tags, suggestions } = this.state;    

        const toggleHover = () => {
            this.setState({hover: !this.state.hover})

            if (this.state.hover) {
                styles.submitStyle = {
                    width: "100%",
                    margin: "0 auto 30px",
                    borderColor: "#4286f4",
                    color: "white",
                    backgroundColor: "#4286f4",
                    transition: "color 0.3s, background-color 0.3s"
                }
            }
            else {
                styles.submitStyle = {
                    width: "100%",
                    margin: "0 auto 30px",
                    borderColor: "#4286f4",
                    color: "#4286f4",
                    backgroundColor: "white",
                    transition: "color 0.3s, background-color 0.3s"
                }
            }
        }

        let submitButton = this.state.is_loading ? (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ) : (
            <input 
                type="submit" 
                value="Submit"
                style={styles.submitStyle}
                onMouseEnter={toggleHover} 
                onMouseLeave={toggleHover}
            />
        );

        const loggedIn = (
            <div style={styles.outerDivStyle}>
                <p>{this.state.onClickTest}</p>
                <form style={styles.formStyle} onSubmit={this.onSubmit}>
                    <label style={styles.labelStyle}>
                        <h1 style={styles.headerStyle}>Edit Event</h1>
                    </label>
                    <label style={styles.labelStyle}>
                        Event Name:
                        <br />
                        <input 
                            type="text" 
                            name="name" 
                            maxLength="100" 
                            style={styles.inputStyle}
                            value={name}
                            onChange={this.onChange}
                            required
                        />
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Event Address:
                        <br />
                        <div style={styles.addressDivStyle}>
                            Street Address
                            <br />
                            <input 
                                type="text" 
                                name="address" 
                                maxLength="250"
                                style={styles.inputStyle}
                                value={address}
                                onChange={this.onChange}
                                pattern="[a-zA-Z0-9.\- ]+"
                                title="Only alphanumeric characters, periods and dashes are accepted in this field."
                                required
                            />
                            City
                            <br />
                            <input 
                                type="text" 
                                name="city" 
                                maxLength="100"
                                style={styles.inputStyle}
                                value={city}
                                onChange={this.onChange}
                                pattern="[a-zA-Z0-9]+"
                                title="Only alphanumeric characters are accepted in this field."
                                required
                            />
                            <br />
                            <div style={styles.stateDivStyle}>State: Florida</div>
                            Zip Code
                            <input 
                                type="text" 
                                name="zip_code" 
                                maxLength="11"
                                style={styles.inputStyle}
                                value={zip_code}
                                onChange={this.onChange}
                                pattern="[0-9\-]+"
                                title="Only number characters and dashes are accepted in this field."
                                required
                            />
                        </div>                        
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Description:
                        <br />
                        <textarea 
                            name="description" 
                            rows="8" 
                            cols="55"
                            style={styles.descriptionStyle}
                            value={description}
                            onChange={this.onChange}
                            required
                        />
                        <br />
                        <div>
                            <ReactTags tags={tags}
                                suggestions={suggestions}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                handleDrag={this.handleDrag}
                                delimiters={delimiters}
                                autofocus={false}
                                inputFieldPosition="inline"
                                maxLength={1500} />
                        </div>
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Date:
                        <br />
                            <input 
                                type="date" 
                                name="date" 
                                style={styles.inputStyle}
                                value={date}
                                onChange={this.onDateChange}
                                required
                            />
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Time:
                        <br />
                        <div style={styles.timeDivStyle}>
                            <div style={styles.startTimeDivStyle}>
                                Start Time
                                <input 
                                    type="time" 
                                    name="start_time"
                                    style={styles.timeStyle}
                                    value={start_time}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div style={styles.endTimeDivStyle}>
                                End Time
                                <input 
                                    type="time" 
                                    name="end_time"
                                    style={styles.timeStyle}
                                    value={end_time}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Contact Phone Number:
                        <br />
                        <input 
                            type="tel" 
                            name="phone_number" 
                            maxLength="250" 
                            pattern="[0-9]{10}" 
                            placeholder="1235556789"
                            style={styles.inputStyle}
                            value={phone_number}
                            onChange={this.onChange}
                            required
                        />
                        <br />
                    </label>
                    <label style={styles.labelStyle}>
                        Contact Email Address:
                        <br />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="johndoe@gmail.com"
                            style={styles.inputStyle}
                            value={email}
                            onChange={this.onChange}
                            required
                        />
                        <br />
                    </label>
                    <label style={styles.bottomLabelStyle}>
                        {submitButton}
                    </label>
                </form>
            </div>
        );

        const notLoggedIn = (
            <Redirect to='/login' />
        );

        return (
            <div>
                { isAuthenticated ? loggedIn : notLoggedIn }
            </div>            
        )
    }
}

const styles = {
    outerDivStyle: {
        width: "60%",
        height: "90%",
        margin: "50px auto",
        backgroundColor: "#F5F5F5",
        border: "3px solid #4286f4",
        borderRadius: "10px"
    },
    formStyle: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    labelStyle: {
        width: "60%",
        height: "100%",
        margin: "30px auto 0px",
        fontSize: "1.2em"
    },
    bottomLabelStyle: {
        width: "60%",
        height: "100%",
        margin: "30px auto"
    },
    inputStyle: {
        margin: "10px 0",
        width: "100%"
    },
    descriptionStyle: {
        margin: "10px 0",
        width: "100%",
        resize: "none"
    },
    timeDivStyle: {
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0 0",
    },
    startTimeDivStyle: {
        width: "90%",
        margin: "0 10px 0 0",
        fontSize: "0.8em"
    },
    endTimeDivStyle: {
        width: "90%",
        margin: "0 0 0 10px",
        fontSize: "0.8em"
    },
    timeStyle: {
        width: "100%",
        margin: "0"
    },
    submitStyle: {
        width: "100%",
        margin: "0 auto 30px",
        borderColor: "#4286f4",
        color: "white",
        backgroundColor: "#4286f4",
        transition: "color 0.3s, background-color 0.3s"
    },
    headerStyle: {
        margin: "0"
    },
    addressDivStyle: {
        fontSize: "0.8em"
    },
    stateDivStyle: {
        fontSize: "1.2em",
        fontWeight: "bold",
        margin: "10px 0"
    },
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    uLocations: state.uLocations.uLocations,
});

export default connect(mapStateToProps, { getULocations, editULocation })(EditEventForm);
