package com.architech.pluto.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.architech.pluto.model.Object;

public interface ObjectRepository extends JpaRepository<Object, Integer> {
	
}
