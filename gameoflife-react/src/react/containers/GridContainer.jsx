import React, { Component } from "react";
import CellContainer from "./CellContainer";

class GridContainer extends Component {
  //tomando como parametros los valores this.rows y this.cols de mainContainer (heredados como props), creo un Array al cual le pusheo componentes CellContainer. Dichos parametros definiran las coordenadas de cada componente, las cuales se corresponden con la posicion de un booleano en el nested array que es el grid de MainContainer(pasado a GridContainer por props). Esto me permite manejar individualmente el estado de cada celula, tanto desde el punto de vista de la logica del juego (reflejada en el this.state de MainContainer / props de GridContainer) como de la visualizacion del estado de cada celula (a traves de la alternancia de la clase de CSS de cada CellContainer)

  render() {
    let compArr = [];
    let compClass;
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let compId = i + "_" + j;
       
        // Un If ternario define que clase de css sera aplicada al componente Cell, basado en el valor del booleano en la posicion correspondiente del grid. De este modo se visualiza el cambio en cada celula de una generacion a otra.
        this.props.grid[i][j] ? compClass =  "cell alive" : compClass =  "cell dead";
        compArr.push(
          <CellContainer
            compClass={compClass}
            x={i}
            y={j}
            changeCellState={this.props.changeCellState}
            key={compId}
          />
        );
      }
    }
    // retorno el arreglo compuesto por los componentes CellContainer definidos arriba
    return <div className="grid">{compArr}</div>;
  }
}

export default GridContainer;
