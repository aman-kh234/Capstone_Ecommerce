package com.ecommerce.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class Cart_Item {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long cartItem_id;
	
	@ManyToOne
	@JsonIgnore
	private Cart cart;
	
	private Product product;
	
	private String size;
	
	private int quantity = 1;
	
	private Integer mrpPrice;
	
	private Integer sellingPrice;
	
	private Long userid;
}