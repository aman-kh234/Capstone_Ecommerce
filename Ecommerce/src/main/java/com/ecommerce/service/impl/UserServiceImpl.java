package com.ecommerce.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.config.JwtProvider;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	
	@Autowired
	private final UserRepository userRepository;
	@Autowired
	private final JwtProvider jwtProvider;
	
	@Override
	public User findUserByJwtToken(String jwt) throws Exception {
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		User user = this.findUserByEmail(email);
		
		return user;
	}

	@Override
	public User findUserByEmail(String email) throws Exception {
		User user = userRepository.findByEmail(email);
		
		if(user==null) {
			throw new Exception("user not found with email - " + email);
		}
		return user;
	}

	@Override
	public User updateUserDetails(User user, Long userId) throws Exception {
		User user1 = userRepository.findById(userId).get();
		if(user1==null) {
			throw new Exception("user not found with email - " + user.getEmail());
		}
		user1.setFullName(user.getFullName());
		user1.setMobile(user.getMobile());
		return userRepository.save(user1);
	}
	
}
