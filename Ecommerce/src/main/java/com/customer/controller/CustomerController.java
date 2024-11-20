package com.customer.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.customer.entity.Customer;
import com.customer.service.CustomerService;

@RestController
@RequestMapping("/")
public class CustomerController {
//	@GetMapping(produces = {"application/json"})
	
	@Autowired
	private CustomerService cs;
	
	@GetMapping("home")
	public String getdefault() {
		return "hello";
	}
	
	@PostMapping("/add")
	public Customer add(@RequestBody Customer customer) {
		System.out.println("5256265");
		return cs.createcustomer(customer);
	}
}
