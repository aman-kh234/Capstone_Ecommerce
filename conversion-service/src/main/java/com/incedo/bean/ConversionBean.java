package com.incedo.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversionBean {
	private String from;
	private String to;
	private double exchangeValue;
	private int qty;
	private double totalValue;
	private int port;
	
}
