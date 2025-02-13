const RESULT_MATCH = [
    // Rows
    { topLeft: 0, topMiddle: 0, topRight: 0 }, // X win
    { topLeft: 1, topMiddle: 1, topRight: 1 }, // O win
    { centerLeft: 0, centerMiddle: 0, centerRight: 0 }, // X win
    { centerLeft: 1, centerMiddle: 1, centerRight: 1 }, // O win
    { bottomLeft: 0, bottomMiddle: 0, bottomRight: 0 }, // X win
    { bottomLeft: 1, bottomMiddle: 1, bottomRight: 1 }, // O win
  
    // Columns
    { topLeft: 0, centerLeft: 0, bottomLeft: 0 }, // X win
    { topLeft: 1, centerLeft: 1, bottomLeft: 1 }, // O win
    { topMiddle: 0, centerMiddle: 0, bottomMiddle: 0 }, // X win
    { topMiddle: 1, centerMiddle: 1, bottomMiddle: 1 }, // O win
    { topRight: 0, centerRight: 0, bottomRight: 0 }, // X win
    { topRight: 1, centerRight: 1, bottomRight: 1 }, // O win
  
    // Diagonals
    { topLeft: 0, centerMiddle: 0, bottomRight: 0 }, // X win
    { topLeft: 1, centerMiddle: 1, bottomRight: 1 }, // O win
    { topRight: 0, centerMiddle: 0, bottomLeft: 0 }, // X win
    { topRight: 1, centerMiddle: 1, bottomLeft: 1 }, // O win
  ];

  export default RESULT_MATCH