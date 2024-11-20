package com.ecommerce.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int product_id;
	
	//title,description,mrpPrice,sellingPrice,discountPercent,quantity,color,images,numRatings,Category,Seller
	
	private String title;
	
	private String description;
	
	private int mrpPrice;
	
	private int sellingPrice;
	
	private double discountPercent;
	
	private int quantity;
	
	private String color;
	
	@ElementCollection   // create seperate table for images
	private List<String> images = new ArrayList<>();
	
	private int numRatings;
	
	@ManyToOne
	private Category category;
	
	@ManyToOne
	private Seller seller;
}
