import React, { Component } from 'react';
import {Button, Container, Chip} from '@material-ui/core';

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

    handleRemove = (id) => () => {
        this.setState({ loading: true })
        fetch(`Unit/api/unit/remove/${id}`, { method: 'DELETE' }).then(() => this.populateUnitData());
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
                        <Button variant="contained" href={`/edit/${unit.id}`} style={{ backgroundColor: "#FFCC66" }}>EDIT</Button>
                        <Button variant="contained" onClick={this.handleRemove(unit.id)} style={{ marginLeft: 10, backgroundColor: "#FF6666" }}>REMOVE</Button>
                    </div>
                </Container>
                )}
            </Container>
        );
    }
}