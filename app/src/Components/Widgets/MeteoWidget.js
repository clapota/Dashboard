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
import { withStyles } from '@material-ui/styles';
import getTemp from '../../Services/WeatherService';

const styles = themes => ({
    title: {
        color: 'black',
        fontWeight: 800
    },
    text: {
        color: 'black',
    },
    header: {
        backgroundColor: 'white',
    },
    action: {
        color: 'white',
    },
    card: {
        backgroundColor: 'lightgrey',
    }
});

class MeteoWidget extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            open: false,
            city: this.props.data.city,
            unit: this.props.data.unit || 'celsius',
            temperature: this.props.data.temperature,
        };
    }

    handleChange(name, event) {
        this.setState({
            ...this.state,
            [name]: event.target.value
        });
        this.props.notifyChange(name, event.target.value, this.props.index);
    }

    handleClose() {
        this.setState({
            ...this.state,
            open: false
        });
        this.updateMeteoData();
    }

    handleOpen() {
        this.setState({
            ...this.state,
            open: true
        });
    }

    updateMeteoData() {
        if (this.state.city !== undefined) {
            getTemp(this.state.city, this.state.unit)
                .then((data) => {
                    if (data !== undefined)
                        this.setState({temperature: data})
                        this.props.notifyChange('temperature', data, this.props.index);
                });
        }
    }

    render() {
        const {classes} = this.props;

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
                    {this.state.temperature === undefined ? this.state.city === undefined ? <Typography classes={{root: classes.text}}>Please select a city</Typography> : <Typography classes={{root: classes.text}}> {this.state.city} : Invalid city </Typography> : <RadialChart unit={this.state.unit} degree={this.state.temperature} city={this.state.city} />}
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