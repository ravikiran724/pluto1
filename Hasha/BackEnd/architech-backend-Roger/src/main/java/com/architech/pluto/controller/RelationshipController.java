package com.architech.pluto.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.architech.pluto.model.Relationship;
import com.architech.pluto.service.CombinationService;
import com.architech.pluto.service.ObjectService;
import com.architech.pluto.service.RelationshipService;
import com.architech.pluto.service.RelationshipTypeService;
import com.architech.pluto.service.UserService;

@RestController
@RequestMapping("/relationship")
public class RelationshipController {
	@Autowired
	RelationshipService relationshipService;
	
	@Autowired
	RelationshipTypeService relationshipTypeService;
	
	@Autowired
	CombinationService combinationService;

	@Autowired
	UserService userService;
	
	@Autowired
	ObjectService objectService;
	
    @GetMapping("/getAll")
    public RelationshipRequestObject list() {
    	RelationshipRequestObject relationshipRequestObject = new RelationshipRequestObject();
        List<Relationship> relationships = relationshipService.listAllRelationship();
        relationshipRequestObject.setRelationships(relationships);
        List<Integer> arrUserIds = new ArrayList<Integer>();
        List<Integer> arrObjectIds = new ArrayList<Integer>();
        List<Integer> arrRelationshipTypeIds = new ArrayList<Integer>();
        for (Relationship relationship : relationships) {
        	arrUserIds.add(relationship.getCreatedByUserId());
        	arrObjectIds.add(relationship.getFromObjectId());
        	arrObjectIds.add(relationship.getToObjectId());
        	arrRelationshipTypeIds.add(relationship.getRelationshipTypeId());
		}
        relationshipRequestObject.setUsers(userService.getUsersByIds(arrUserIds));
        relationshipRequestObject.setObjects(objectService.getObjectByIds(arrObjectIds));
        relationshipRequestObject.setRelationshipTypes(relationshipTypeService.getRelationshipTypesByIds(arrRelationshipTypeIds));
        return relationshipRequestObject;
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Relationship> get(@PathVariable Integer id) {
        try {
        	Relationship relationship = relationshipService.getRelationship(id);
        	
            return new ResponseEntity<Relationship>(relationship, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Relationship>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/createRelationship")
    public void add(@RequestBody Relationship relationshipObject, Authentication authentication) {
    	System.out.println(relationshipObject.getFromObjectId());
    	System.out.println(relationshipObject.getToObjectId());
    	relationshipObject.setCreatedByUserId(userService.getUserByUsername(authentication.getName()).getId());
    	relationshipObject.setCreatedAt(new Date(System.currentTimeMillis()));
    	relationshipService.saveRelationship(relationshipObject);
    	
    }
    
    @PostMapping("/updateRelationship/{id}")
    public ResponseEntity<?> update(@RequestBody Relationship relationship, @PathVariable Integer id) {
        try {
        	Relationship existAttribute = relationshipService.getRelationship(id);
        	relationship.setId(existAttribute.getId());
        	existAttribute.setFromObjectId(relationship.getFromObjectId());
        	existAttribute.setToObjectId(relationship.getToObjectId());
        	existAttribute.setRelationshipTypeId(relationship.getRelationshipTypeId());
            relationshipService.saveRelationship(existAttribute);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/deleteRelationship/{id}")
    public void delete(@PathVariable Integer id) {

    	relationshipService.deleteRelationship(id);
    }
    @PostMapping("/deleteRelationships")
    public void deleteMultiples(@RequestBody RequestObject requestBody) {
    	Iterable<Integer> ids = requestBody.getData();
    	relationshipService.deleteRelationships(ids);
    }
}
