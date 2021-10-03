import React, { Component } from 'react';
import { Redirect } from "react-router";
import { TextField, Button, Container, Select, MenuItem, InputLabel } from '@material-ui/core';
import './CreateEditForm.css';

export class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hp: '',
      maxHp: '',
      mana: '',
      maxMana: '',
      armor: '',
      magicResistance: '',
      unitClass: '',
      x: '',
      y: ''
    }
  }

  fetchData = async (e) => {
    e.preventDefault();
    const response = await fetch("Unit/api/unit/create", 
    {
      method: "POST",
       headers: {
         "Content-Type": "application/json;charset=utf-8",
         "Accept": "application/json"
      },
      body: JSON.stringify({...this.state})
    });
    return (<Redirect push to="/list"/>);
    //return await response.json();
  }

  resetForm = (e) => {
    this.setState({
      hp: '',
      maxHp: '',
      mana: '',
      maxMana: '',
      armor: '',
      magicResistance: '',
      unitClass: '',
      x: '',
      y: ''
    });
  }

  validateHp = (value) => {
    if (this.checkNegativeValue(value)) {
      return;
    }
    if (+value > +this.state.maxHp) {
      this.setState({ maxHp: value })
    }
    this.setState({ hp: value })
  }

  validateMaxHp = (value) => {
    if (this.checkNegativeValue(value)) {
      return;
    }
    if (+value < +this.state.hp) {
      this.setState({ hp: value })
    }
    this.setState({ maxHp: value })
  }

  validateMana = (value) => {
    if (this.checkNegativeValue(value)) {
      return;
    }
    if (+value > +this.state.maxMana) {
      this.setState({ maxMana: value })
    }
    this.setState({ mana: value })
  }

  validateMaxMana = (value) => {
    if (this.checkNegativeValue(value)) {
      return;
    }
    if (+value < +this.state.mana) {
      this.setState({ mana: value })
    }
    this.setState({ maxMana: value })
  }

  validateArmor = (value) => {
    if (this.checkNegativeValue(value)) {
      return;
    }
    this.setState({ armor: value })
  }
  validateMagicResist = (value) => {
    if (this.checkNegativeValue(value)) {
      return;
    }
    this.setState({ magicResistance: value })
  }

  checkNegativeValue = (value) => value < 0 ? true : false
  render() {
    return (
      <Container maxWidth="sm">
        <form onSubmit={this.fetchData} method="POST">
          <div className="CreateEditForm_flexWrapper">
            <TextField
              type="number"
              value={this.state.hp}
              min={0}
              onChange={(e) => {
                this.validateHp(e.target.value)
              }}
              variant="outlined"
              label="Current HP"
              required
            />
            <TextField
              type="number"
              value={this.state.maxHp}
              onChange={(e) => {
                this.validateMaxHp(e.target.value)
              }}
              variant="outlined"
              label="Maximum HP"
              required
            />
          </div>
          <div className="CreateEditForm_flexWrapper CreateEditForm_section">
            <TextField
              type="number"
              value={this.state.mana}
              onChange={(e) => {
                this.validateMana(e.target.value)
              }}
              variant="outlined"
              label="Current Mana"
              required
            />
            <TextField
              type="number"
              value={this.state.maxMana}
              onChange={(e) => {
                this.validateMaxMana(e.target.value)
              }}
              variant="outlined"
              label="Maximum Mana"
              required
            />
          </div>
          <div className="CreateEditForm_section">
            <TextField
              className="CreateEditForm_textField"
              type="number"
              value={this.state.armor}
              onChange={(e) => this.validateArmor(e.target.value)}
              variant="outlined"
              label="Armor"
              required
            />
          </div>
          <div className="CreateEditForm_section">
            <TextField
              className="CreateEditForm_textField"
              type="number"
              value={this.state.magicResistance}
              onChange={(e) => this.validateMagicResist(e.target.value)}
              variant="outlined"
              label="Magic resistance"
              required
            />
          </div>
          <div className="CreateEditForm_section">
            <InputLabel id="demo-simple-select-label">Unit Class</InputLabel>
            <Select
              className="CreateEditForm_select"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.unitClass}
              label="Unit Class"
              onChange={(e) => this.setState({ unitClass: e.target.value })}
              required
            >
              <MenuItem value={"Warrior"}>Warrior</MenuItem>
              <MenuItem value={"Archer"}>Archer</MenuItem>
              <MenuItem value={"Wizard"}>Wizard</MenuItem>
            </Select>
          </div>
          <div className="CreateEditForm_flexWrapper CreateEditForm_section">
            <TextField
              type="number"
              value={this.state.x}
              onChange={(e) => this.setState({ x: e.target.value })}
              variant="outlined"
              label="X coordinate"
              required
            />
            <TextField
              type="number"
              value={this.state.y}
              onChange={(e) => this.setState({ y: e.target.value })}
              variant="outlined"
              label="Y coordinate"
              required
            />
          </div>
          <div className="CreateEditForm_flexWrapper CreateEditForm_section">
            <Button
              type="submit"
              className="CreateEditForm_button CreateEditForm_button-create"
              variant="contained"
            >
              Create
            </Button>
            <Button
              className="CreateEditForm_button CreateEditForm_button-reset"
              onClick={this.resetForm}
              variant="outlined"
            >
              Reset
            </Button>
          </div>
        </form>
      </Container >
    );
  }
}