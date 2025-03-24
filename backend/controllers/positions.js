const e = require("cors");
const { getPositionsDao, updatePositionsDao } = require("../database/database")

const getPositions = () => (req, res) => {
    // query database

    var positions = getPositionsDao()
  
    console.log(`found ${positions} positions`)
  
    res.status(200).json({
      positions: positions
    });
    };

const updatePositions = () => (req, res) => {
    const { positions } = req.body
  
    if (typeof positions != 'number') {
      return res.status(400).json({ error: 'positions is required and must be a number'})
    } else if (positions < 0 || positions > 20) {
        return res.status(400).json({ error: 'positions must be between 0 and 20'})
    }
  
    updatePositionsDao(positions)
  
    console.log(`persisted positions of ${positions}`)
  
    res.status(200).json({
      positions: positions
    });
    };
    
module.exports = { getPositions, updatePositions };