package com.architech.pluto.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.architech.pluto.model.AttributeType;
import com.architech.pluto.model.Combination;
import com.architech.pluto.model.RelationshipType;
import com.architech.pluto.service.AttributeTypeService;
import com.architech.pluto.service.CombinationService;
import com.architech.pluto.service.RelationshipTypeService;

@RestController
@RequestMapping("/relationshipType")
public class RelationshipTypeController {
	@Autowired
	RelationshipTypeService relationshipTypeService;
	
	@Autowired
	CombinationService combinationService;

    @GetMapping("/getAll")
    public List<RelationshipType> list() {
        return relationshipTypeService.listAllRelationshipType();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<RelationshipTypeRequestObject> get(@PathVariable Integer id) {
        try {
        	RelationshipType relationshipType = relationshipTypeService.getRelationshipType(id);
        	List<Combination> combinations = combinationService.getCombinationsByRelationshipTypeId(id);
        	RelationshipTypeRequestObject returnObject = new RelationshipTypeRequestObject();
        	returnObject.setCombinations(combinations);
        	returnObject.setRelationshipType(relationshipType);
            return new ResponseEntity<RelationshipTypeRequestObject>(returnObject, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<RelationshipTypeRequestObject>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/createRelationshipType")
    public void add(@RequestBody RelationshipTypeRequestObject relationshipTypeObject) {
    	RelationshipType relationshipType = relationshipTypeObject.getRelationshipType();
    	relationshipTypeService.saveRelationshipType(relationshipType);
    	Iterable<Combination> combinations = relationshipTypeObject.getCombinations();
    	for (Combination combination: combinations) {
    		combination.setRelationshipTypeId(relationshipType.getId());
    		combinationService.saveCombination(combination);
    	}
    }
    
    @PostMapping("/updateRelationshipType/{id}")
    public ResponseEntity<?> update(@RequestBody RelationshipTypeRequestObject relationshipTypeObject, @PathVariable Integer id) {
        try {
        	RelationshipType existAttributeType = relationshipTypeService.getRelationshipType(id);
        	RelationshipType relationshipType = relationshipTypeObject.getRelationshipType();           
            relationshipTypeService.saveRelationshipType(relationshipType);
            
            combinationService.deleteCombinationsByRelationshipTypeId(id);
            
            Iterable<Combination> combinations = relationshipTypeObject.getCombinations();
        	for (Combination combination: combinations) {
        		combination.setRelationshipTypeId(relationshipType.getId());
        		combinationService.saveCombination(combination);
        	}
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/deleteRelationshipType/{id}")
    public void delete(@PathVariable Integer id) {

    	relationshipTypeService.deleteRelationshipType(id);
    }
    @PostMapping("/deleteRelationshipTypes")
    public void deleteMultiples(@RequestBody RequestObject requestBody) {
    	Iterable<Integer> ids = requestBody.getData();
    	relationshipTypeService.deleteRelationshipTypes(ids);
    }
    
}
