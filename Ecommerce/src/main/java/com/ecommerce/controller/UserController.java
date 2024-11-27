package com.ecommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.domain.UserRole;
import com.ecommerce.model.User;
import com.ecommerce.response.AuthResponse;
import com.ecommerce.response.SignupRequest;
import com.ecommerce.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	
	@GetMapping("users/profile")
	public ResponseEntity<User> createUserHandler(@RequestHeader("Authorization")String jwt) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		return ResponseEntity.ok(user);
	}
}
