
package com.architech.pluto.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.Attribute;
import com.architech.pluto.model.AttributeTypeObjectType;
import com.architech.pluto.repo.AttributeRepository;

@Service
@Transactional
public class AttributeService {
	@Autowired
	private AttributeRepository attributeRepository;

	public List<Attribute> listAllAttribute() {
		return attributeRepository.findAll();
	}

	public void saveAttribute(Attribute attribute) {
		attributeRepository.save(attribute);
	}

	public Attribute getAttribute(Integer id) {
		return attributeRepository.findById(id).get();
	}

	public void deleteAttribute(Integer id) {
		attributeRepository.deleteById(id);
	}
	
	public void deleteAttributesByObjectId(Integer id) {
		Attribute attributeExample = new Attribute();
		attributeExample.setObjectId(id);
		ExampleMatcher matcher = ExampleMatcher.matching()     
				  .withIgnorePaths("id")
				  .withIgnorePaths("attributeTypeId")
				  .withIgnorePaths("value")
				  .withIncludeNullValues(); 
		Example<Attribute> example = Example.of(attributeExample, matcher);
		Iterable<Attribute> attributes = attributeRepository.findAll(example);
		attributeRepository.deleteAll(attributes);
	}
	
	public List<Attribute> getAttributesByObjectId(Integer id) {
		Attribute attributeExample = new Attribute();
		attributeExample.setObjectId(id);
		ExampleMatcher matcher = ExampleMatcher.matching()     
				  .withIgnorePaths("id")
				  .withIgnorePaths("attributeTypeId")
				  .withIgnorePaths("value")
				  .withIncludeNullValues(); 
		Example<Attribute> example = Example.of(attributeExample, matcher);
		return attributeRepository.findAll(example);
	}
}
