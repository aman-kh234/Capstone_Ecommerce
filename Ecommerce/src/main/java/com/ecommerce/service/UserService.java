package com.ecommerce.service;

import org.springframework.stereotype.Service;

import com.ecommerce.model.User;


public interface UserService{
	User findUserByJwtToken(String jwt) throws Exception;
	User findUserByEmail(String email) throws Exception;
	User updateUserDetails(User user,Long userId) throws Exception;
}
