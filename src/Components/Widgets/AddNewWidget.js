import React from 'react';
import MeteoWidget from './MeteoWidget';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';
import Add from '@material-ui/icons/Add';
import './AddNewWidget.css';
import Modal from '@material-ui/core/Modal';
import './Widget.css';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';

const widgetList = new Map([
    ['meteo', <MeteoWidget/>],
]);


class AddNewWidget extends React.Component {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);

        let firstWidget;
        let i = 0;
        for (let [key, value] of widgetList) {
            if (i === 0)
                firstWidget = value;
            ++i;
        }
        this.state = {
            open: false,
            widget: firstWidget,
        };
    }

    handleChange(name, e) {
        console.log('aled');
        this.setState({
            ...this.state,
            [name]: widgetList[e.target.value],
        });
    }

    handleClose() {
        this.setState({
            ...this.state,
            open: false,
        })
    }

    showModal() {
        console.log('zizi');
        this.setState({
            ...this.state,
            open: true
        });
    }

    submit() {
        if (this.state.widget !== undefined) {
            console.log('listener being called !!!!');
            this.props.listener(this.state.widget);
        }
        this.setState({
            ...this.state,
            open: false,
        })
    }

    render() {
        let optionList = [];
        let i = 0;
        let firstValue;
        for (let [key, value] of widgetList.entries()) {
            if (i === 0)
                firstValue = key;
            optionList.push(<option value={key}>{key}</option>);
            i++;
        }
        return (
            <>
                <Card className="add-card">
                    <ButtonBase
                    onClick={this.showModal}
                    className="card-action">
                        <CardContent>
                            <Container>
                                <Icon className="icon-text">
                                    <Add/>
                                </Icon>
                            </Container>
                        </CardContent>
                    </ButtonBase>
                </Card>
                <Modal
                open={this.state.open}
                onClose={this.handleClose}>
                    <div className="modal-dashboard">
                        <Typography variant="h4">
                            Add a widget
                        </Typography>
                        <Select
                            native
                            onChange={e => this.handleChange('widget', e)}
                            value={firstValue}
                            inputProps={{
                                name: 'widget',
                            }}
                        >
                            {optionList}
                        </Select>
                        <Button variant="contained" color="primary" onClick={this.submit}>
                            Add this widget
                        </Button>
                    </div>
                </Modal>
            </>
        )
    }
}

export default AddNewWidget;