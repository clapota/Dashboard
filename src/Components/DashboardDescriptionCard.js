import React from 'react';
import {Card, CardHeader, Typography, CardContent, CardActions, IconButton} from '@material-ui/core';
import '@material-ui/icons';
import { MoreHoriz } from '@material-ui/icons';

class DashboardDescriptionCard extends React.Component {
    render() {
        return (
            <Card >
                <CardHeader 
                    title={this.props.title}

                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="More">
                        <MoreHoriz/>
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

export default DashboardDescriptionCard;