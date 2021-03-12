package com.architech.pluto.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.AttributeType;
import com.architech.pluto.model.AttributeTypeObjectType;
import com.architech.pluto.repo.AttributeTypeObjectTypeRepository;
import com.fasterxml.jackson.databind.annotation.JsonAppend.Attr;

@Service
@Transactional
public class AttributeTypeObjectTypeService {
	@Autowired
	private AttributeTypeObjectTypeRepository attributeTypeObjectTypeRepository;

	public List<AttributeTypeObjectType> listAllAttributeTypeObjectType() {
		return attributeTypeObjectTypeRepository.findAll();
	}

	public void saveAttributeTypeObjectType(AttributeTypeObjectType attributeTypeObjectType) {
		attributeTypeObjectTypeRepository.save(attributeTypeObjectType);
	}

	public AttributeTypeObjectType getAttributeType(Integer id) {
		return attributeTypeObjectTypeRepository.findById(id).get();
	}

	public void deleteAttributeType(Integer id) {
		attributeTypeObjectTypeRepository.deleteById(id);
	}
	
	public List<Integer> getAttributeTypeObjectTypeByObjectTypeId(Integer id) {
		AttributeTypeObjectType attributeTypeObjectTypeExample = new AttributeTypeObjectType();
		attributeTypeObjectTypeExample.setObjectTypeId(id);
		ExampleMatcher matcher = ExampleMatcher.matching()     
				  .withIgnorePaths("id")
				  .withIgnorePaths("attributeTypeId")
				  .withIncludeNullValues(); 
		Example<AttributeTypeObjectType> example = Example.of(attributeTypeObjectTypeExample, matcher);
		
		List<AttributeTypeObjectType> arrAttributeTypeObjectType =  attributeTypeObjectTypeRepository.findAll(example);
		List<Integer> arrIds = new ArrayList<Integer>();
		for (AttributeTypeObjectType integer : arrAttributeTypeObjectType) {
			arrIds.add(integer.getAttributeTypeId());
		}
		return arrIds;
	}
	
	
}
