import React, {Component} from 'react'

// este es el componente que renderizado muchas veces conforma el tablero del juego. Recibe como props la clase definida en grid container y un metodo onClick para cambiar el valor de su booleano correspondiente en el grid, y por ende su clase de css
class CellContainer extends Component {
	changeCellState = () => {
		this.props.changeCellState(this.props.x, this.props.y);
	}

	render() {
		return (
			<div
				className={this.props.compClass}
				onClick={this.changeCellState}
			/>
		);
	}
}

export default CellContainer
