package com.architech.pluto.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.ObjectType;
import com.architech.pluto.repo.ObjectTypeRepository;

@Service
@Transactional
public class ObjectTypeService {
	@Autowired
	private ObjectTypeRepository objectTypeRepository;

	public List<ObjectType> listAllObjectType() {
		return objectTypeRepository.findAll();
	}

	public void saveObjectType(ObjectType objectType) {
		objectTypeRepository.save(objectType);
	}

	public ObjectType getObjectType(Integer id) {
		return objectTypeRepository.findById(id).get();
	}

	public void deleteObjectType(Integer id) {
		objectTypeRepository.deleteById(id);
	}
	
	public void deleteObjectTypes(Iterable<Integer> ids) {
		Iterable<ObjectType> attributes = objectTypeRepository.findAllById(ids);
		objectTypeRepository.deleteAll(attributes);
	}
}
