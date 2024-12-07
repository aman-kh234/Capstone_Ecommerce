package com.ecommerce.service;

import com.ecommerce.model.Address;
import com.ecommerce.model.User;

public interface AddressService {
	public User createAddress(Address address,Long userId) throws Exception;
	public void deleteAddress(Address address,Long userId);
}
