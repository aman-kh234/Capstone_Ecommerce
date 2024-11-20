package com.ecommerce.model;

import java.util.HashSet;
import java.util.Set;

import com.ecommerce.domain.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long user_id;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)  // will not come to the frontend : This is commonly used for fields like passwords or sensitive information that should be accepted as input (deserialized) but not exposed in responses (serialized).
	private String password;
	
	private String email;
	
	private String fullname;
	
	private String mobile;
	
	private UserRole user_role = UserRole.Role_Customer;
	
	@OneToMany
	private Set<Address> addresses = new HashSet<>();
	
	@ManyToMany
	@JsonIgnore
	private Set<Coupon> used_coupon = new HashSet<>();
}
