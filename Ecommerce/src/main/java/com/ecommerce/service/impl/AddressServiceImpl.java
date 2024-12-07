package com.ecommerce.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Address;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.AddressService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService{
	@Autowired
	UserRepository userRepository;
	@Override
	public User createAddress(Address address,Long userId) throws Exception {
		User user = userRepository.findById(userId).get();
		Address address1 = new Address();
		address1.setAddress(address.getAddress());
		address1.setLocality(address.getLocality());
		address1.setCity(address.getCity());
		address1.setState(address.getState());
		address1.setName(address.getName());
		address1.setPinCode(address.getPinCode());
		address1.setMobile(address.getMobile());
		try {
			if(user.getAddresses().contains(address1)) {
				throw new Exception("Address already added");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		user.getAddresses().add(address1);
		userRepository.save(user);
		return user;
	}

	@Override
	public void deleteAddress(Address address,Long userId) {
		
	}
	
}
