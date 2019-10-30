import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Modal, TextField, Select, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import './Widget.css';

const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'f1c2359583253af4b56ab54379447b58';


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

    changeCity(_city) {
        this.setState({
            ...this.state,
            city: _city
        });
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
        return (
            <>
            <Card>
                <CardHeader
                    title="Meteo widget"
                    action={
                        <IconButton onClick={this.handleOpen}>
                            <MoreVert />
                        </IconButton>
                    }
                />
                <CardContent>
                    {this.state.temperature === undefined ? this.state.city + ': Invalid city' : 'Temperature in ' + this.state.city + ' : ' + this.state.temperature.toFixed(0) +' ' +this.state.unit}
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

export default MeteoWidget;