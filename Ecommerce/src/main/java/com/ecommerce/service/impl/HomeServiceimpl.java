package com.ecommerce.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.domain.HomeCategorySection;
import com.ecommerce.model.Home;
import com.ecommerce.model.HomeCategory;
import com.ecommerce.service.HomeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeServiceimpl implements HomeService{
	@Override
	public Home createHomePageData(List<HomeCategory> allcategories) {
		List<HomeCategory> gridCategories = allcategories.stream()
			    .filter(category -> category.getSection() == HomeCategorySection.GRID)
			    .collect(Collectors.toList());

		List<HomeCategory> shopByCategories = allcategories.stream()
		    .filter(category -> category.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES)
		    .collect(Collectors.toList());
		
		List<HomeCategory> electriCategories = allcategories.stream()
			    .filter(category -> category.getSection() == HomeCategorySection.ELECTRIC_CATEGORIES)
			    .collect(Collectors.toList());
		
		List<HomeCategory> dealCategories = allcategories.stream()
			    .filter(category -> category.getSection() == HomeCategorySection.DEALS)
			    .collect(Collectors.toList());
		
//		if (dealRepository.findAll().isEmpty()) {
//		    List<Deal> deals = allcategories.stream()
//		        .filter(category -> category.getSection() == HomeCategorySection.DEALS)
//		        .map(category -> new Deal(id = null, discount = 18, category)) // Assuming a default discount of 18
//		        .collect(Collectors.toList());
//
//		    createdDeals = dealRepository.saveAll(deals);
//		} else {
//		    createdDeals = dealRepository.findAll();}
		return null;
	}
	
}
