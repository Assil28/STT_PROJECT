const Bus = require("../models/busModel");

const getAllBus = ((req, res) => {
    Bus.find({})
        .then(result => res.json({ result }))
        .catch(() => res.json({ msg: 'Bus not found' }))
})

const getBus = (req, res) => {
    Bus.findOne({ _id: req.params.BusID })
      .then(result => {
        if (!result) {
          return res.json({ msg: 'Bus not found' });
        }
        res.json({ result });
      })
      .catch(error => res.json({ msg: 'Error finding Bus', error }));
  };
  

  const deleteBus = ((req, res) => {
    Bus.findOneAndDelete({ _id: req.params.BusID })
        .then(result => {
            if (!result) {
                return res.json({ msg: 'Bus not found' });
            }
            res.json({ result });
        })
        .catch(error => res.status(500).json({ msg: 'Error deleting Bus', error }));
})


const createBus = ((req, res) => {
    Bus.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateBus = (req, res) => {
    const busId = req.params.BusID;

    Bus.findOneAndUpdate({ _id: busId }, req.body, { new: true }) // { new: true } returns the updated document
        .then(updatedBus => {
            if (updatedBus) {
                res.json({ result: updatedBus });
            } else {
                res.status(404).json({ msg: 'Bus not found' });
            }
        })
        .catch(error => {
            console.error('Error updating company:', error);
            res.status(500).json({ msg: 'Internal server error' });
        });
};

module.exports = {
    getAllBus,
    getBus,
    createBus,
    updateBus,
    deleteBus
}