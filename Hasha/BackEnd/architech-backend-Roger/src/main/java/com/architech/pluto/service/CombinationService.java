package com.architech.pluto.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.AttributeTypeObjectType;
import com.architech.pluto.model.Combination;
import com.architech.pluto.model.RelationshipType;
import com.architech.pluto.repo.CombinationRepository;

@Service
@Transactional
public class CombinationService {
	@Autowired
	private CombinationRepository combinationRepository;

	public List<Combination> listAllCombination() {
		return combinationRepository.findAll();
	}

	public void saveCombination(Combination combination) {
		combinationRepository.save(combination);
	}

	public Combination getCombination(Integer id) {
		return combinationRepository.findById(id).get();
	}

	public void deleteCombination(Integer id) {
		combinationRepository.deleteById(id);
	}
	
	public List<Combination> getCombinationsByRelationshipTypeId(Integer id) {
		Combination combinationExample = new Combination();
		combinationExample.setRelationshipTypeId(id);
		ExampleMatcher matcher = ExampleMatcher.matching()     
				  .withIgnorePaths("id")
				  .withIgnorePaths("fromObjectTypeId")
				  .withIgnorePaths("toObjectTypeId")
				  .withIncludeNullValues(); 
		Example<Combination> example = Example.of(combinationExample, matcher);
		
		return combinationRepository.findAll(example);
	
	}
	
	public List<Combination> getCombinationsByRelationshipTypeIdFromId(Integer id, Integer fromId) {
		Combination combinationExample = new Combination();
		combinationExample.setRelationshipTypeId(id);
		combinationExample.setFromObjectTypeId(fromId);
		ExampleMatcher matcher = ExampleMatcher.matching()     
				  .withIgnorePaths("id")
				  .withIgnorePaths("toObjectTypeId")
				  .withIncludeNullValues(); 
		Example<Combination> example = Example.of(combinationExample, matcher);
		
		return combinationRepository.findAll(example);
	}
	
	public void deleteCombinationsByRelationshipTypeId(Integer id) {
		Combination combinationExample = new Combination();
		combinationExample.setRelationshipTypeId(id);
		ExampleMatcher matcher = ExampleMatcher.matching()     
				  .withIgnorePaths("id")
				  .withIgnorePaths("fromObjectTypeId")
				  .withIgnorePaths("toObjectTypeId")
				  .withIncludeNullValues(); 
		Example<Combination> example = Example.of(combinationExample, matcher);
		
		Iterable<Combination> combinations = combinationRepository.findAll(example);
		combinationRepository.deleteAll(combinations);
	}
} 
