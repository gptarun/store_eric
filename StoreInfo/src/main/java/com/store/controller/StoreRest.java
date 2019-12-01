package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.entity.Store;
import com.store.service.StoreService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/store")
@Api(value = "onlinestore")
@CrossOrigin(origins = "*")
public class StoreRest {

	@Autowired
	private StoreService storeService;

	@GetMapping("/store/{id}")
	public Store getStore(@PathVariable(value = "id") Long id) {
		return storeService.getStoreById(id);
	}

	@PutMapping("/store/newstore")
	public void addNewStore(@RequestParam(value = "name") String name,
			@RequestParam(value = "location") String location, @RequestParam(value = "address") String address,
			@RequestParam(value = "catagory") String catagory) {
		storeService.newstore(name, location, address, catagory);
	}

	@PostMapping("/store/addStore")
	public void addStore(@RequestBody Store store) {
		System.out.println(store.getStoreName() + "  - " + store.getStoreLocation());
		storeService.addStore(store);
	}

	@PostMapping("/store/updatestore")
	public void updateStore(@RequestParam(value = "id") Long id, @RequestParam(value = "name") String name,
			@RequestParam(value = "location") String location, @RequestParam(value = "address") String address,
			@RequestParam(value = "catagory") String catagory) {
		storeService.updateStore(id, name, location, address, catagory);
	}

	@GetMapping("/store/getAll")
	public List<Store> getStore() {
		return storeService.getAllStore();
	}

}
