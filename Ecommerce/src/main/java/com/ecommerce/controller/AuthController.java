package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.domain.UserRole;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.response.AuthResponse;
import com.ecommerce.response.SignupRequest;
import com.ecommerce.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	@Autowired
	private UserRepository userRepository;
	
	private final AuthService authService;
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req){
		String jwt = authService.createUser(req);
		
		AuthResponse res = new AuthResponse();
		res.setJwt(jwt);
		res.setMessage("register Success");
		res.setRole(UserRole.Role_Customer);
		
		return ResponseEntity.ok(res);
	}
}
