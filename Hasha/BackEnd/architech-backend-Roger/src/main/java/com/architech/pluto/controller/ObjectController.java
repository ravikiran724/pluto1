package com.architech.pluto.controller;

import static com.architech.pluto.security.SecurityConstants.HEADER_STRING;
import static com.architech.pluto.security.SecurityConstants.SECRET;
import static com.architech.pluto.security.SecurityConstants.TOKEN_PREFIX;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.architech.pluto.model.Attribute;
import com.architech.pluto.model.AttributeType;
import com.architech.pluto.model.Combination;
import com.architech.pluto.model.Object;
import com.architech.pluto.model.Relationship;
import com.architech.pluto.model.RelationshipType;
import com.architech.pluto.model.User;
import com.architech.pluto.service.AttributeService;
import com.architech.pluto.service.AttributeTypeObjectTypeService;
import com.architech.pluto.service.AttributeTypeService;
import com.architech.pluto.service.CombinationService;
import com.architech.pluto.service.ObjectService;
import com.architech.pluto.service.RelationshipService;
import com.architech.pluto.service.RelationshipTypeService;
import com.architech.pluto.service.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;



@RestController
@RequestMapping("/object")
public class ObjectController {
	@Autowired
	private ObjectService objectService;
	
	@Autowired
	private UserService userService;
	@Autowired
	private AttributeService attributeService;
	@Autowired
	private AttributeTypeService attributeTypeService;
	@Autowired
	private AttributeTypeObjectTypeService attributeTypeObjectTypeService;
	@Autowired
	private CombinationService combinationeService;
	@Autowired
	private RelationshipService relationshipService;
	@Autowired
	private RelationshipTypeService relationshipTypeService;


    @PostMapping("/getAll")
    public List<Object> list() {
        return objectService.listAllObject();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<ObjectRequestObject> get(@PathVariable Integer id) {
        try {
        	Object object = objectService.getObject(id);
        	List<Attribute> attributes = attributeService.getAttributesByObjectId(id);
        	List<Integer> attributeTypeIds = attributeTypeObjectTypeService.getAttributeTypeObjectTypeByObjectTypeId(object.getObjectTypeId());
        	List<AttributeType> attributeTypes = attributeTypeService.getAttributeTypeByIds(attributeTypeIds);
        	ObjectRequestObject objectRequestObject = new ObjectRequestObject();
        	objectRequestObject.setAttributes(attributes);
        	objectRequestObject.setObject(object);
        	objectRequestObject.setAttributeTypes(attributeTypes);
            return new ResponseEntity<ObjectRequestObject>(objectRequestObject, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<ObjectRequestObject>(HttpStatus.NOT_FOUND);
        }
    }
    
    
    @PostMapping("/createObject")
    public void add(@RequestBody ObjectRequestObject objectRequestObject, Authentication authentication) {
    	Object object = objectRequestObject.getObject();
    	object.setCreateByUserId(userService.getUserByUsername(authentication.getName()).getId());
    	object.setCreationDate(new Date(System.currentTimeMillis()));          	
        objectService.saveObject(object);
    	Iterable<Attribute> attributes = objectRequestObject.getAttributes();
    	for (Attribute attribute : attributes) {
			attribute.setObjectId(object.getId());
			attributeService.saveAttribute(attribute);
		}
    	
    }
    
    @PostMapping("/updateObject/{id}")
    public ResponseEntity<?> update(@RequestBody ObjectRequestObject objectRequestObject, @PathVariable Integer id) {
        try {
        	Object existObject = objectService.getObject(id);
        	Object object = objectRequestObject.getObject();
        	object.setId(id);            
        	objectService.saveObject(object);
        	attributeService.deleteAttributesByObjectId(id);
        	Iterable<Attribute> attributes = objectRequestObject.getAttributes();
        	for (Attribute attribute : attributes) {
    			attribute.setObjectId(object.getId());
    			attributeService.saveAttribute(attribute);
    		}
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/deleteObject/{id}")
    public void delete(@PathVariable Integer id) {
    	objectService.deleteObject(id);
    	attributeService.deleteAttributesByObjectId(id);
    }
    
    @PostMapping("/deleteObjects")
    public void deleteObjects(@RequestBody RequestObject objectRequestObject) {
    	Iterable<Integer> ids = objectRequestObject.getData();
    	objectService.deleteObjects(ids);
    	for (Integer id : ids) {
    		attributeService.deleteAttributesByObjectId(id);
		}
    	
    }
    
    @GetMapping("/getByCombinationsFrom/{id}")
    public List<Object> getByCombinationsFrom(@PathVariable Integer id) {
    	Iterable<Combination> combinations = combinationeService.getCombinationsByRelationshipTypeId(id);
    	List<Integer> arrIds = new ArrayList<Integer>();
    	for (Combination combination : combinations) {
    		arrIds.add(combination.getFromObjectTypeId());
		}
    	return objectService.findObjectsByObjectTypeIds(arrIds);
    }
    
    @GetMapping("/getByCombinationsTo/{id}/{fromId}")
    public List<Object> getByCombinationsTo(@PathVariable Integer id, @PathVariable Integer fromId) {
    	Iterable<Combination> combinations = combinationeService.getCombinationsByRelationshipTypeIdFromId(id, fromId);
    	List<Integer> arrIds = new ArrayList<Integer>();
    	for (Combination combination : combinations) {
    		arrIds.add(combination.getToObjectTypeId());
		}
    	return objectService.findObjectsByObjectTypeIds(arrIds);
    }
    
    @GetMapping("/showMoreChildren/{id}")
    public RelationshipRequestObject getChildrenObjects(@PathVariable Integer id) {
    	List<Relationship> relationships = relationshipService.listAllByFromObjectId(id);
    	List<RelationshipType> relationshipTypes = new ArrayList<RelationshipType>();
    	List<Object> objects = new ArrayList<Object>();
    	RelationshipRequestObject returnObject = new RelationshipRequestObject();
    	for (Relationship relationship : relationships) {
    		relationshipTypes.add(relationshipTypeService.getRelationshipType(relationship.getRelationshipTypeId()));
    		objects.add(objectService.getObject(relationship.getToObjectId()));
 
		}
    	returnObject.setObjects(objects);
    	returnObject.setRelationshipTypes(relationshipTypes);
    	returnObject.setRelationships(relationships);
    	return returnObject;
    }
    
    public User getCurrentUser(@AuthenticationPrincipal User user) {
        return user;
    }
}
