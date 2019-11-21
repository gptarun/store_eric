package com.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.entity.Store;
import com.store.service.StoreService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/store")
@Api(value = "onlinestore")
public class StoreRest {

	@Autowired
	private StoreService storeService;

	@GetMapping("/store/{id}")
	public Store getStore(@PathVariable(value = "id") Long id) {
		return storeService.getStoreById(id);
	}

	@PutMapping("/store/newstore")
	public void addNewStore(@RequestParam(value = "name") String name, @RequestParam(value = "location") String location,
			@RequestParam(value = "address") String address, @RequestParam(value = "catagory") String catagory) {
		storeService.addStore(name, location, address, catagory);
	}
	
	@PostMapping("/store/updatestore")
	public void updateStore(@RequestParam(value = "id") Long id,@RequestParam(value = "name") String name, @RequestParam(value = "location") String location,
			@RequestParam(value = "address") String address, @RequestParam(value = "catagory") String catagory) {
		storeService.updateStore(id, name, location, address, catagory);
	}
}
