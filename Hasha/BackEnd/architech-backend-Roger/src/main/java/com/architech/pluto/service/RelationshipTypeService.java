package com.architech.pluto.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.ObjectType;
import com.architech.pluto.model.RelationshipType;
import com.architech.pluto.repo.RelationshipTypeRepository;

@Service
@Transactional
public class RelationshipTypeService {
	@Autowired
	private RelationshipTypeRepository relationshipTypeRepository;

	public List<RelationshipType> listAllRelationshipType() {
		return relationshipTypeRepository.findAll();
	}
	
	public List<RelationshipType> getRelationshipTypesByIds(Iterable<Integer> ids) {
		return relationshipTypeRepository.findAllById(ids);
	}

	public void saveRelationshipType(RelationshipType relationshipType) {
		relationshipTypeRepository.save(relationshipType);
	}

	public RelationshipType getRelationshipType(Integer id) {
		return relationshipTypeRepository.findById(id).get();
	}

	public void deleteRelationshipType(Integer id) {
		relationshipTypeRepository.deleteById(id);
	}
	public void deleteRelationshipTypes(Iterable<Integer> ids) {
		Iterable<RelationshipType> relationshipTypes = relationshipTypeRepository.findAllById(ids);
		relationshipTypeRepository.deleteAll(relationshipTypes);
	}
	
}
