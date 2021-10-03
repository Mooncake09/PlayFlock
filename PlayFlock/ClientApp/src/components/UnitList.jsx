import React, { Component } from 'react';
import {Button, Container, Chip} from '@material-ui/core';
// import Container from '@material-ui/core/Container';
// import Chip from '@material-ui/core/Chip';

export class UnitList extends Component {
    constructor(props) {
        super(props);
        this.state = { unitList: [], loading: true };
    }
    componentDidMount() {
        this.populateUnitData();
    }

    async populateUnitData() {
        const response = await fetch('Unit/api/unit/list');
        const data = await response.json();
        this.setState({ unitList: data, loading: false });
    }

    render() {
        return (
            <Container maxWidth="md">
                <Button variant="contained" color="primary" href="/create" fullWidth>Add new unit</Button>
                {this.state.unitList.map(unit => <Container key={unit.id} style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', padding: 4, borderRadius: '4px', border: '1px solid black' }}>
                    <div>
                        <Chip label={`unit ID: ${unit.id}`} color="primary" style={{ marginRight: 20 }} />
                        <Chip label={`hp: ${unit.hp}`} style={{ marginRight: 15, backgroundColor: "#FFCCCC", color: "black" }} />
                        <Chip label={`mp: ${unit.mana}`} style={{ marginRight: 15, backgroundColor: "#6699FF", color: "black" }} />
                        <Chip label={`class: ${unit.unitClass}`} style={{ marginRight: 15, backgroundColor: "#CC99FF", color: "black" }} />
                    </div>
                    <div>
                        <Button variant="contained" href="/edit" style={{ backgroundColor: "#FFCC66" }}>EDIT</Button>
                        <Button variant="contained" href="/remove" style={{ marginLeft: 10, backgroundColor: "#FF6666" }}>REMOVE</Button>
                    </div>
                </Container>
                )}
            </Container>
        );
    }
}