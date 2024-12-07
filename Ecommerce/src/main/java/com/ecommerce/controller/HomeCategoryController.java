package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Home;
import com.ecommerce.model.HomeCategory;
import com.ecommerce.service.HomeCategoryService;
import com.ecommerce.service.HomeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping()
public class HomeCategoryController {
	@Autowired
	private HomeCategoryService homecategoryService;
	@Autowired
	private HomeService homeService;
	
	@PostMapping("/home/categories")
	public ResponseEntity<Home> createHomeCategories(
	    @RequestBody List<HomeCategory> homeCategories
	) {
	    List<HomeCategory> categories = homecategoryService.createCategories(homeCategories);
	    Home home = homeService.createHomePageData(categories);
	    return new ResponseEntity<>(home, HttpStatus.ACCEPTED);
	}
}
