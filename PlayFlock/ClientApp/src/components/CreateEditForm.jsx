import React, { Component } from 'react';
import { withRouter } from "react-router";
import { TextField, Button, Container, Select, MenuItem, InputLabel } from '@material-ui/core';
import './CreateEditForm.css';

const initialValues = {
  hp: '',
  maxHP: '',
  mana: '',
  maxMana: '',
  armor: '',
  magicResistance: '',
  unitClass: '',
  x: '',
  y: ''
}

class CreateEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialValues;
  }

  componentDidMount() {
    const [, mode, id] = this.props.history.location.pathname.split('/');
    const isInEditMode = mode === 'edit';

    if (isInEditMode) {
      fetch(`Unit/api/unit/edit/${id}`).then((response) => {
        return response.json();
      }).then((initialValues) => {
        this.setState(initialValues)
      });
    }
  }

  createUnit = async (e) => {
    e.preventDefault();
    await fetch("Unit/api/unit/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          ...this.state
         })
      });
    this.props.history.push("/list");
  }

  editUnit = async (e) => {
    const [, mode, id] = this.props.history.location.pathname.split('/');

    e.preventDefault();
    await fetch(`Unit/api/unit/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Accept": "application/json"
        },
        body: JSON.stringify({ ...this.state })
      });
    this.props.history.push("/list");
  }

  resetForm = (e) => {
    this.setState(initialValues);
  }

  validatehp = (value) => {
    if (this.checkNegativeValue(value)) {
      return;
    }
    if (+value > +this.state.maxHP) {
      this.setState({ maxHP: value })
    }
    this.setState({ hp: value })
  }

  validatemaxHP = (value) => {
    if (this.checkNegativeValue(value)) {
      return;
    }
    if (+value < +this.state.hp) {
      this.setState({ hp: value })
    }
    this.setState({ maxHP: value })
  }

  validatemana = (value) => {
    if (this.checkNegativeValue(value)) {
      return;
    }
    if (+value > +this.state.maxMana) {
      this.setState({ maxMana: value })
    }
    this.setState({ mana: value })
  }

  validatemaxMana = (value) => {
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

  checkNegativeValue = (value) => value < 0 ? true : false;

  render() {
    const [, mode] = this.props.history.location.pathname.split('/');
    return (
      <Container maxWidth="sm">
        <form onSubmit={mode=== 'edit' ? this.editUnit : this.createUnit} method="POST">
          <div className="CreateEditForm_flexWrapper">
            <TextField
              type="number"
              value={this.state.hp}
              min={0}
              onChange={(e) => {
                this.validatehp(e.target.value)
              }}
              variant="outlined"
              label="Current hp"
              required
            />
            <TextField
              type="number"
              value={this.state.maxHP}
              onChange={(e) => {
                this.validatemaxHP(e.target.value)
              }}
              variant="outlined"
              label="Maximum hp"
              required
            />
          </div>
          <div className="CreateEditForm_flexWrapper CreateEditForm_section">
            <TextField
              type="number"
              value={this.state.mana}
              onChange={(e) => {
                this.validatemana(e.target.value)
              }}
              variant="outlined"
              label="Current mana"
              required
            />
            <TextField
              type="number"
              value={this.state.maxMana}
              onChange={(e) => {
                this.validatemaxMana(e.target.value)
              }}
              variant="outlined"
              label="Maximum mana"
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
              label="Unit class"
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
              {mode === 'edit' ? 'Save' : 'Create'}
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
export default withRouter(CreateEditForm);