
package com.architech.pluto.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.AttributeType;
import com.architech.pluto.repo.AttributeTypeRepository;

@Service
@Transactional
public class AttributeTypeService {
	@Autowired
	private AttributeTypeRepository attributeTypeRepository;

	public List<AttributeType> listAllAttributeType() {
		return attributeTypeRepository.findAll();
	}

	public void saveAttributeType(AttributeType attributeType) {
		attributeTypeRepository.save(attributeType);
	}

	public AttributeType getAttributeType(Integer id) {
		return attributeTypeRepository.findById(id).get();
	}

	public void deleteAttributeType(Integer id) {
		attributeTypeRepository.deleteById(id);
	}
	
	public void deleteAttributeTypes(Iterable<Integer> ids) {
		Iterable<AttributeType> attributes = attributeTypeRepository.findAllById(ids);
		attributeTypeRepository.deleteAll(attributes);
	}
	
	public List<AttributeType> getAttributeTypeByIds(Iterable<Integer> ids) {
		return attributeTypeRepository.findAllById(ids);
	}

}
