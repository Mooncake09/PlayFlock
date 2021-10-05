import React, { Component } from 'react';
import { withRouter } from "react-router";
import { TextField, Button, Container, Select, MenuItem, InputLabel } from '@material-ui/core';
import './CreateEditForm.css';

class Attack extends Component {

    constructor(props) {
        super(props);
        this.state = {unitList: [], id1: "", id2: ""};
    }

    componentDidMount() {
        this.populateUnitData();
    }

    async populateUnitData() {
        const response = await fetch('Unit/api/unit/list');
        const data = await response.json();
        this.setState({ unitList: data });
    }

    fetchData = async (e) => {
        e.preventDefault();
        await fetch("Unit/api/unit/attack",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
            },
            body: JSON.stringify({ 
            id1: this.state.id1,
            id2: this.state.id2
            })
        });
        this.props.history.push("/list");
    }

    render() {
        return (
            <Container maxWidth="sm">
            <form method="POST" onSubmit={(e) => this.fetchData(e)}>
                <InputLabel id="demo-simple-select-label">Unit Id1</InputLabel>
                <Select
                    className="CreateEditForm_select"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.id1} //{this.state.id.id1}
                    label="Unit id"
                    onChange={(e) => this.setState({id1: e.target.value}) } 
                    required
                >
                    {this.state.unitList.map(unit => <MenuItem key={unit.id} value={`${unit.id}`}>{unit.id}</MenuItem>)}
                </Select>
                <h1>Attack</h1>
                <InputLabel id="demo-simple-select-label2">Unit Id2</InputLabel>
                <Select
                    className="CreateEditForm_select"
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    value={this.state.id2}
                    label="Unit id"
                    onChange={(e) => this.setState({id2: e.target.value}) } 
                    required
                >
                    {this.state.unitList.map(unit => <MenuItem key={unit.id} value={`${unit.id}`}>{unit.id}</MenuItem>)}
                </Select>
                <Button variant="contained" type="submit">Attack</Button>
            </form>
        </Container>
        );
    }
}
export default withRouter(Attack);