package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Cart;
import com.ecommerce.model.Coupon;
import com.ecommerce.model.User;
import com.ecommerce.service.CartService;
import com.ecommerce.service.CouponService;
import com.ecommerce.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupons")
public class AdminCouponController {
	@Autowired
	private final CouponService couponService;
	@Autowired
	private final UserService userService;
	@Autowired
	private final CartService cartService;

	@PostMapping("")public AdminCouponController() {
		// TODO Auto-generated constructor stub
	}@Sche
	public ResponseEntity<Cart> applyCoupon(@RequestParam String apply, @RequestParam String code, @RequestParam double orderValue, @RequestHeader("Authorization")String jwt) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		Cart cart;
		if(apply.equals("true")) {
			cart = couponService.applyCoupon(code, orderValue, user);
		}
		else {
			cart = couponService.removeCoupon(code, user);
		}
		
		return ResponseEntity.ok(cart);
		
	}
	
	@PostMapping("/admin/create")
	public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon){
		Coupon createdCoupon = couponService.createCoupon(coupon);
		return ResponseEntity.ok(createdCoupon);
	}
	
	@DeleteMapping("/admin/delete/{id}")
	public ResponseEntity<?> deleteCoupon(@PathVariable Long id) throws Exception{
		couponService.deleteCoupon(id);
		return ResponseEntity.ok("Coupon deleted successfully");
	}
	
	@GetMapping("/admin/all")
	public ResponseEntity<List<Coupon>> getAllCoupons(){
		List<Coupon> coupon = couponService.findAllCoupons();
		return ResponseEntity.ok(coupon);
	}
}
