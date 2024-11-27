package com.ecommerce.service;

import org.springframework.stereotype.Service;

import com.ecommerce.model.User;

@Service
public interface UserService{
	User findUserByJwtToken(String jwt) throws Exception;
	User findUserByEmail(String email) throws Exception;
}
