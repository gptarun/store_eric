package com.store.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.store.entity.Store;

@Repository
public interface StoreRepository extends CrudRepository<Store,Long> {}
