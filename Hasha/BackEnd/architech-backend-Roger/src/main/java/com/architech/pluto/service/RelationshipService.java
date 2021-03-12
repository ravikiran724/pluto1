package com.architech.pluto.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.Attribute;
import com.architech.pluto.model.Relationship;
import com.architech.pluto.repo.RelationshipRepository;

@Service
@Transactional
public class RelationshipService {
	@Autowired
	private RelationshipRepository relationshipRepository;

	public List<Relationship> listAllRelationship() {
		return relationshipRepository.findAll();
	}
	
	public List<Relationship> listAllByFromObjectId(Integer id) {
		Relationship exampleRelationship = new Relationship();
		exampleRelationship.setFromObjectId(id);
		ExampleMatcher matcher = ExampleMatcher.matching()     
				  .withIgnorePaths("id")
				  .withIgnorePaths("toObjectId")
				  .withIgnorePaths("relationshipTypeId")
				  .withIgnorePaths("createdAt")
				  .withIgnorePaths("createdByUserId")
				  .withIgnorePaths("name")
				  .withIncludeNullValues(); 
		Example<Relationship> example = Example.of(exampleRelationship, matcher);
		return relationshipRepository.findAll(example);
	}

	public void saveRelationship(Relationship relationship) {
		relationshipRepository.save(relationship);
	}

	public Relationship getRelationship(Integer id) {
		return relationshipRepository.findById(id).get();
	}

	public void deleteRelationship(Integer id) {
		relationshipRepository.deleteById(id);
	}
	
	public void deleteRelationships(Iterable<Integer> ids) {
		Iterable<Relationship> relationships = relationshipRepository.findAllById(ids);
		relationshipRepository.deleteAll(relationships);
	}
}
