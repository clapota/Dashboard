import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MoreVert from '@material-ui/icons/MoreVert';
import './Widget.css';
import RadialChart from '../RadialBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'f1c2359583253af4b56ab54379447b58';

const styles = themes => ({
    title: {
        color: 'white',
    },
    header: {
        backgroundColor: '#3f51b5',
    },
    action: {
        color: 'white',
    },
    card: {
        backgroundColor: '#27293d',
    }
});

class MeteoWidget extends React.Component {
    constructor(props) {
        super(props);
        this.showOptions = this.showOptions.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            open: false,
            city: this.props.city,
            unit: 'celsius',
            temperature: undefined
        };
    }

    fetchMeteoInfo() {
        console.log('RE FETCH DE LA METEO');
        console.log('URL : ' + url + this.state.city + '&APPID=' + apiKey);
        fetch(url + this.state.city + '&APPID=' + apiKey)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    ...this.state,
                    temperature: this.state.unit === 'celsius' ? data.main.temp - 273 : (data.main.temp - 273.15) * (9/5) + 32
                }))
            .catch(error => this.setState({
                ...this.state,
                temperature: undefined
            }))
        console.log('BITE de noir');
    }

    handleChange(name, event) {
        this.setState({
            ...this.state,
            [name]: event.target.value
        });
    }

    showOptions() {
        console.log('test');
    }

    handleClose() {
        this.setState({
            ...this.state,
            open: false
        });
        this.fetchMeteoInfo();
    }

    handleOpen() {
        this.setState({
            ...this.state,
            open: true
        });
    }

    componentDidMount() {
        this.fetchMeteoInfo();
    }

    render() {
        const {classes} = this.props;
        console.log('re Render');
        console.log(this.state.unit);
        return (
            <>
            <Card classes={{
                root: classes.card,
            }}>
                <CardHeader
                    classes={{
                        title: classes.title,
                        root: classes.header,
                        action: classes.action,
                    }}
                    title="Meteo widget"
                    action={
                        <IconButton onClick={this.handleOpen}>
                            <MoreVert />
                        </IconButton>
                    }
                />
                <CardContent>
                    {this.state.temperature === undefined ? this.state.city === undefined ? <Typography classes={{root: classes.title}}>Please select a city</Typography> : <Typography classes={{root: classes.title}}> {this.state.city} : Invalid city </Typography> : <RadialChart unit={this.state.unit} degree={this.state.temperature} city={this.state.city} />}
                </CardContent>
            </Card>
            <Modal
                open={this.state.open}
                onClose={this.handleClose}
            >
                <div className="modal-dashboard">
                    <Typography variant="h4">
                        Meteo settings
                    </Typography>
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        autoComplete="city"
                        autoFocus
                        defaultValue={this.state.city}
                        onChange={e => this.handleChange('city', e)}
                    />
                    <Select
                        native
                        value={this.state.unit}
                        onChange={e => this.handleChange('unit', e)}
                        inputProps={{
                            name: 'unit',
                            id: 'unit-native-helper'
                        }}
                    >
                        <option value="celsius">celsius</option>
                        <option value="farenheit">farenheit</option>
                    </Select>
                </div>
            </Modal>
            </>
        );
    }
}

export default withStyles(styles)(MeteoWidget);