package com.incedo.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.incedo.bean.ConversionBean;

@FeignClient(name="EXCHANGE-SERVICE")
public interface exchangeProxy {
	@GetMapping("exchangeservice/from/{from}/to/{to}")
	public ConversionBean getExhangeValue(@PathVariable String from,@PathVariable String to);
}
