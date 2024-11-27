package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Exception.ProductException;
import com.ecommerce.Exception.SellerException;
import com.ecommerce.model.Product;
import com.ecommerce.model.Seller;
import com.ecommerce.response.CreateProductRequest;
import com.ecommerce.service.ProductService;
import com.ecommerce.service.SellerService;

import jdk.jshell.spi.ExecutionControl.UserException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/seller/products")
public class SellerProductController {
	@Autowired
	private final ProductService productService;
	@Autowired
	private final SellerService sellerService;
	
	@PostMapping()
	public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest request,@RequestHeader("Authorization") String jwt) throws Exception 
	{
	    Seller seller = sellerService.getSellerProfile(jwt);
	    Product product = productService.createProduct(request, seller);
	    return new ResponseEntity<>(product, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{productId}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long productId)throws ProductException{
	productService.deleteProduct(productId);
	return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/{productId}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long productId,@RequestBody Product product){
		try {
			Product updatedProduct = productService.updateProduct(productId, product);
			return new ResponseEntity<>(updatedProduct,HttpStatus.OK);
		} catch (ProductException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
