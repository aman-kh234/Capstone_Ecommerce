package com.incedo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.incedo.bean.ConversionBean;
import com.incedo.proxy.exchangeProxy;

@RestController
public class ConversionController {

//	@Autowired
//	private RestTemplate rt;
	
	@Autowired
	private exchangeProxy proxy;
	
//	@GetMapping("conversionservice/from/{from}/to/{to}/qty/{qty}")
//	public ConversionBean getValue(@PathVariable String from,@PathVariable String to,@PathVariable int qty) {
//		ConversionBean cb = new ConversionBean();
//		cb.setFrom(from);
//		cb.setTo(to);
		
//		ConversionBean cb = rt.getForObject("http://localhost:8081/exchangeservice/from/{from}/to/{to}",ConversionBean.class, from,to);
//		cb.setQty(qty);
//		cb.setTotalValue(qty*cb.getExchangeValue());
//		return cb;
//	}
	@GetMapping("conversionservice/from/{from}/to/{to}/qty/{qty}")
	public ConversionBean getValue(@PathVariable String from,@PathVariable String to,@PathVariable int qty) {
		ConversionBean cb = proxy.getExhangeValue(from, to);
		cb.setQty(qty);
		cb.setTotalValue(qty*cb.getExchangeValue());
		return cb;
	}
}
