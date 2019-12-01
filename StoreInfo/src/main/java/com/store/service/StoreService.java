package com.store.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.constants.Category;
import com.store.entity.Store;
import com.store.repository.StoreRepository;


@Service
public class StoreService {
	
	@Autowired
	private StoreRepository storeRepository;
	
	public void newstore(String name,String location, String address, String catagory) {
		Store store = new Store(null,name, location, address, Category.valueOf(catagory));
		storeRepository.save(store);
	}
	
	public void updateStore(Long id,String name,String location, String address, String catagory) {
		Store store = storeRepository.findById(id).get();
		store.setAddress(address);
		store.setStoreLocation(location);
		store.setStoreName(name);
		store.setCategory(Category.valueOf(catagory));
		storeRepository.save(store);
		
	}
	
	public Store getStoreById(Long storeId) {
		return storeRepository.findById(storeId).get();
	}
	
	public List<Store> getAllStore(){
		Iterator<Store> allStoreIterator = storeRepository.findAll().iterator();
		List<Store> stores = new ArrayList<>();
		while(allStoreIterator.hasNext()) {
			stores.add(allStoreIterator.next());
		}
		
		return stores;
	}

	public void addStore(Store store) {
		storeRepository.save(store);
		
	}
}
