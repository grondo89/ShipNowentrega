import React, { Component } from "react";
import GridContainer from "./GridContainer";
import Controller from "../components/Controller";

// creo un container que va a manejar el grid en su state, la logica del juego y contener los metodos que seran pasados como props a otros componentes 

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.speed = 300;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      grid: this.gridCreator(),
      newSpeed: 0
    };
  }

  
  //ejecuta el metodo nextGen en un intervalo definido por la propiedad speed de la clase
  autoPlay = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.nextGen, this.speed);
  };
  
  //limpia el intervalo seteado en autoplay
  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  //Al hacer click, switchea el valor true/false (o viceversa) en la posicion de la celda clickeada en el nested Array Grid en this.state  
  changeCellState = (x, y) => {
    let gridClone = this.arrayClone(this.state.grid);
    gridClone[x][y] = !gridClone[x][y];
    this.setState({
      grid: gridClone
    });
  };

  //Crea un grid conformado por nested Arrays que contienen booleanos (seteados en false por defecto)
  gridCreator = () => {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }

    return board;
  };

  // toma el valor en ms ingresado en el input y lo setea en el state
  handleSpeedChange = e => {
    let speed = e.target.value;
    this.setState({
      newSpeed: speed
    });
  };

  //pausa el autoplay interval en ejecucion (de haber uno) y ejecuta autoplay siguiendo el intervalo ingresado por handleSpeedChange
  setNewSpeed = () => {
    this.pauseButton();
    this.speed = this.state.newSpeed;
    this.autoPlay();
  };

  // "limpia" el grid ejecutando nuevamente gridCreator() que pasa todos los booleanos a false y setea la generacion nuevamente en 0

  clearBoard = () => {
    this.pauseButton();
    let newBoard = this.gridCreator();
    this.setState({
      grid: newBoard,
      generation: 0
    });
  };

  
  // Logica del Game Of Life, incluyendo casos especiales para los bordes y las esquinas. No pude resolver un bug donde el comportamiento no es el adecuado en las esquinas.
  nextGen = () => {
    let g2 = this.arrayClone(this.state.grid);
    let g = this.state.grid;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;

        if (i === 0) {
          if (j === 0) {
            if (g[this.rows - 1][this.cols - 1]) count++;
            if (g[this.rows - 1][j]) count++;
            if (g[this.rows - 1][j + 1]) count++;
            if (g[i][this.cols - 1]) count++;
            if (g[i][j + 1]) count++;
            if (g[i + 1][this.cols - 1]) count++;
            if (g[i + 1][j]) count++;
            if (g[i + 1][j + 1]) count++;
          }
          if (j === this.cols -1) {
            if (g[this.rows - 1][j - 1]) count++;
            if (g[this.rows - 1][j]) count++;
            if (g[this.rows - 1][0]) count++;
            if (g[i][j - 1]) count++;
            if (g[i][0]) count++;
            if (g[i + 1][j - 1]) count++;
            if (g[i + 1][j]) count++;
            if (g[i + 1][0]) count++;
          } else {
            if (g[this.rows - 1][j - 1]) count++;
            if (g[this.rows - 1][j]) count++;
            if (g[this.rows - 1][j + 1]) count++;
            if (g[i][j - 1]) count++;
            if (g[i][j + 1]) count++;
            if (g[i + 1][j - 1]) count++;
            if (g[i + 1][j]) count++;
            if (g[i + 1][j + 1]) count++;
          }
        }

        if (i === this.rows -1) {
          if (j === 0) {
            if (g[i - 1][this.cols - 1]) count++;
            if (g[i - 1][j]) count++;
            if (g[i - 1][j + 1]) count++;
            if (g[i][this.cols - 1]) count++;
            if (g[i][j + 1]) count++;
            if (g[0][this.cols - 1]) count++;
            if (g[0][j]) count++;
            if (g[0][j + 1]) count++;
          } else if (j !== this.cols -1) {
            if (g[i - 1][j - 1]) count++;
            if (g[i - 1][j]) count++;
            if (g[i - 1][j + 1]) count++;
            if (g[i][j - 1]) count++;
            if (g[i][j + 1]) count++;
            if (g[0][j - 1]) count++;
            if (g[0][j]) count++;
            if (g[0][j + 1]) count++;
          }
        }

        if (j === 0) {
          if (i !== 0 && i !== this.rows -1) {
            if (g[i - 1][this.cols - 1]) count++;
            if (g[i - 1][j]) count++;
            if (g[i - 1][j + 1]) count++;
            if (g[i][this.cols - 1]) count++;
            if (g[i][j + 1]) count++;
            if (g[i + 1][this.cols - 1]) count++;
            if (g[i + 1][j]) count++;
            if (g[i + 1][j + 1]) count++;
          }
        }

        if (j === this.cols -1) {
          if (i !== 0 && i < this.rows -1) {
            if (g[i - 1][j - 1]) count++;
            if (g[i - 1][j]) count++;
            if (g[i - 1][0]) count++;
            if (g[i][j - 1]) count++;
            if (g[i][0]) count++;
            if (g[i + 1][j - 1]) count++;
            if (g[i + 1][j]) count++;
            if (g[i + 1][0]) count++;
          } else if (i === this.rows -1) {
            if (g[i - 1][j - 1]) count++;
            if (g[i - 1][j]) count++;
            if (g[i - 1][0]) count++;
            if (g[i][j - 1]) count++;
            if (g[i][0]) count++;
            if (g[0][j - 1]) count++;
            if (g[0][j]) count++;
            if (g[0][0]) count++;
          }
        }

        if (i > 0 && i < this.rows -1 && j > 0 && j < this.cols -1) {
          if (g[i - 1][j - 1]) count++;
          if (g[i - 1][j]) count++;
          if (g[i - 1][j + 1]) count++;
          if (g[i][j - 1]) count++;
          if (g[i][j + 1]) count++;
          if (g[i + 1][j - 1]) count++;
          if (g[i + 1][j]) count++;
          if (g[i + 1][j + 1]) count++;
        }

        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      grid: g2,
      generation: this.state.generation + 1
    });
  };

  //metodo creado para realizar un Deep Clone que permita hacer una copia por valor y no por referencia. Esto permite a la logica del juego trabajar sobre el estado actual del grid sin afectar continuamente el state del container, lo cual generaba comportamientos indeseados.
  arrayClone = arr => {
    return JSON.parse(JSON.stringify(arr));
  };

  render() {
    return (

      // rendereo los componentes controller (que contiene los botones e input del juego, y el grid). Paso como props en cada caso, metodos y propiedades de la clase MainContainer.
      <div className={"container"}>
        <h1 id={"titulo"}>Conway's Game of Life</h1>
        <div >
          <Controller
            nextGen={this.nextGen}
            autoPlay={this.autoPlay}
            pauseButton={this.pauseButton}
            clearBoard={this.clearBoard}
            handleSpeedChange={this.handleSpeedChange}
            setNewSpeed={this.setNewSpeed}
            generation={this.state.generation}
          />
        </div>
        <GridContainer
          grid={this.state.grid}
          rows={this.rows}
          cols={this.cols}
          changeCellState={this.changeCellState}
        />

      </div>
    );
  }
}

export default MainContainer;
