package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.domain.PaymentMethod;
import com.ecommerce.model.Address;
import com.ecommerce.model.User;
import com.ecommerce.response.PaymentLinkResponse;
import com.ecommerce.service.OrderService;
import com.ecommerce.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
	@Autowired
	private final OrderService orderService;
	@Autowired
	private final UserService userService;
	
	@PostMapping()
	public ResponseEntity<PaymentLinkResponse> createOrderHandler(@RequestBody Address shippingAddress,@RequestParam PaymentMethod paymentMethod,@RequestHeader("Authorization")String jwt){
		User user = userService.findUserByJwtToken(jwt);
	}
}
