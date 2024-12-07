package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Address;
import com.ecommerce.model.User;
import com.ecommerce.repository.AddressRepository;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.AddressService;
import com.ecommerce.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/order-address")
@RequiredArgsConstructor
public class AddressController {
	@Autowired
	private UserService userService;
	@Autowired
	private AddressService addressService;
	
	@PostMapping("/create")
	public User createAddressforUser(@RequestHeader("Authorization") String jwt , @RequestBody Address address) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		return addressService.createAddress(address,user.getId());
	}
	
//	@DeleteMapping("/delete")
//	public void deleteAddress(@RequestHeader("Authorization") String jwt,@PathVariable Long AddressId) {
//		User user = userService.findUserByJwtToken(jwt);
//		addressService.deleteAddress(user);
//		return ;
//	}
}
