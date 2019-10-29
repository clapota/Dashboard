import React from 'react';
import Sidebar from './Sidebar';
import {Container, GridList, GridListTile} from '@material-ui/core';
import DashboardDescriptionCard from './DashboardDescriptionCard';
import 'bootstrap/dist/css/bootstrap.css';

class Dashboard extends React.Component {
    render() {
        return(
            <Container>
                <Sidebar/>
                <h1 className="text-center">Your dashboard</h1>
                <GridList cellHeight={200} className="gridlist" cols={2}>
                    <GridListTile cols={1}>
                        <DashboardDescriptionCard title="Meteo" description="Ce widget de météo vous permet de récupérer toutes les informations nécessaires pour la météo lol zizi bite j'aime le caca lorem ipsum dolor sit amet"/>
                    </GridListTile>
                    <GridListTile cols={1}>
                        <DashboardDescriptionCard title="Meteo" description="Ce widget de météo vous permet de récupérer toutes les informations nécessaires pour la météo lol zizi bite j'aime le caca lorem ipsum dolor sit amet"/>
                    </GridListTile>
                    <GridListTile cols={1}>
                        <DashboardDescriptionCard title="Meteo" description="Ce widget de météo vous permet de récupérer toutes les informations nécessaires pour la météo lol zizi bite j'aime le caca lorem ipsum dolor sit amet"/>
                    </GridListTile>
                    <GridListTile cols={1}>
                        <DashboardDescriptionCard title="Meteo" description="Ce widget de météo vous permet de récupérer toutes les informations nécessaires pour la météo lol zizi bite j'aime le caca lorem ipsum dolor sit amet"/>
                    </GridListTile>
                </GridList>
            </Container>
        )
    }
}

export default Dashboard;