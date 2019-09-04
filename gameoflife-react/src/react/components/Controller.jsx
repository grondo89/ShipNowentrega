import React from "react";

//componente que contiene los botones que activan los metodos definidos en mainContainer.  

export default ({
  nextGen,
  autoPlay,
  pauseButton,
  handleSpeedChange,
  clearBoard,
  setNewSpeed,
  generation
}) => (
  <div id="controller">
    <div className="row">
      <button type="button" onClick={nextGen} className="btn btn-info">
        Next Generation
      </button>
      <button type="button" onClick={autoPlay} className="btn btn-info">
        AutoPlay
      </button>
      <button type="button" onClick={pauseButton} className="btn btn-info">
        Pause
      </button>
      <button type="button" onClick={clearBoard} className="btn btn-info">
        Restart
      </button>

      <input
        onChange={e => handleSpeedChange(e)}
        className="col-xs-12 form-control"
        placeholder="Enter new speed (in ms)"
      />

      <button type="button" onClick={setNewSpeed} className="btn btn-info">
        Set Speed
      </button>

      <h3 id={"generacion"}>Generacion #--{generation} </h3>
    </div>
  </div>
);
