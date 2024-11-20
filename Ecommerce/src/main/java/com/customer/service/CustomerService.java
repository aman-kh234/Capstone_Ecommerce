package com.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customer.entity.Customer;
import com.customer.repository.CustomerRepo;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepo repo;
	
	public Customer createcustomer(Customer customer) {
		return repo.save(customer);
	}
}