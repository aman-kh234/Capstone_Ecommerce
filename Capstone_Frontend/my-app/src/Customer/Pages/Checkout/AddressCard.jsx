import React from 'react';
import { Radio } from '@mui/material';

const AddressCard = ({ address, selectedAddress, handleAddressSelect }) => {
  return (
    <div className={`p-5 border rounded-md flex ${selectedAddress?.id === address.id ? 'bg-green-100' : 'bg-white'}`}>
      <div className="mr-3">
        <Radio
          checked={selectedAddress?.id === address.id}  // Check if this address is selected
          onChange={() => handleAddressSelect(address.id)}  // Handle selection on change
          value={address.id}
          name="address-radio-button"
          color="primary"
        />
      </div>
      <div className="space-y-3 pt-3">
        <h1 className="font-semibold text-lg">{address.name}</h1>
        <p>{address.city}, {address.state}, {address.zip}</p>
        <p><strong>Mobile:</strong> {address.mobile}</p>
      </div>
    </div>
  );
};

export default AddressCard;
