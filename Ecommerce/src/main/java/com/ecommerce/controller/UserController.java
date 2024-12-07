package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.domain.UserRole;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.response.AuthResponse;
import com.ecommerce.response.SignupRequest;
import com.ecommerce.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	@Autowired
	private final UserService userService;

	@GetMapping("users/profile")
	public ResponseEntity<User> createUserHandler(@RequestHeader("Authorization")String jwt) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		return ResponseEntity.ok(user);
	}
	
	@PatchMapping("user/update/{userId}")
	public ResponseEntity<User> updateUserHandler(@PathVariable Long userId,@RequestBody User user) throws Exception{
		User user1 = userService.updateUserDetails(user,userId);
		return ResponseEntity.ok(user1);
	}
}
