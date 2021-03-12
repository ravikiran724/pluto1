
package com.architech.pluto.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.AttributeTypeObjectType;
import com.architech.pluto.model.Object;
import com.architech.pluto.repo.ObjectRepository;

@Service
@Transactional
public class ObjectService {
	@Autowired
	private ObjectRepository objectRepository;

	public List<Object> listAllObject() {
		return objectRepository.findAll();
	}
	
	public List<Object> getObjectByIds(Iterable<Integer> ids) {
		return objectRepository.findAllById(ids);
	}

	public void saveObject(Object object) {
		objectRepository.save(object);
	}

	public Object getObject(Integer id) {
		return objectRepository.findById(id).get();
	}

	public void deleteObject(Integer id) {
		objectRepository.deleteById(id);
	}
	
	public void deleteObjects(Iterable<Integer> ids) {
		Iterable<Object> objects = objectRepository.findAllById(ids);
		objectRepository.deleteAll(objects);;
	}
	

	public List<Object> findObjectsByObjectTypeIds(Iterable<Integer> ids) {
		List<Object> arrIds = new ArrayList<Object>();
		for (Integer id : ids) {
			Object ob = new Object();
			ob.setObjectTypeId(id);
			Object objectExample = new Object();
			ExampleMatcher matcher = ExampleMatcher.matching()     
					  .withIgnorePaths("id")
					  .withIgnorePaths("name")
					  .withIgnorePaths("creationDate")
					  .withIgnorePaths("createByUserId")
					  .withIncludeNullValues(); 
			Example<Object> example = Example.of(ob, matcher);
			List<Object> results =  objectRepository.findAll(example);
			for (Object result : results) {
				arrIds.add(result);
			}
		}
		return arrIds;
	}
}
