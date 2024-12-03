const User = require('../Models/User');


const getUserAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching addresses', error: error.message });
  }
};


const addUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.addresses.push(req.body);
    await user.save();
    res.status(201).json({ success: true, addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding address', error: error.message });
  }
};


const updateUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const address = user.addresses.id(req.params.addressId);
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    Object.assign(address, req.body);
    await user.save();
    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating address', error: error.message });
  }
};


const deleteUserAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        
       
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
    
       
        const addressIndex = user.addresses.findIndex(address => address._id.toString() === addressId);
        if (addressIndex === -1) {
          return res.status(404).json({ success: false, message: 'Address not found' });
        }
    
       
        user.addresses.splice(addressIndex, 1);
        await user.save();
    
        return res.status(200).json({ success: true, message: 'Address removed', addresses: user.addresses });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
};

module.exports = {
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
};