const launchBeer = () => (req, res) => {
  const { position } = req.body

  if (typeof position != 'number') {
    return res.status(400).json({ error: 'position is required and must be a number'})
  }

  client.publish(`launch-beer`, position.toString())

  console.log(`launch beer to position ${position}`)

  res.status(200).json({
    position: position
  });
};
  
module.exports = { launchBeer };