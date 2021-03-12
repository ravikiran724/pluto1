package com.architech.pluto.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.architech.pluto.model.AttributeType;
import com.architech.pluto.model.AttributeTypeObjectType;
import com.architech.pluto.model.ObjectType;
import com.architech.pluto.model.User;
import com.architech.pluto.service.AttributeTypeObjectTypeService;
import com.architech.pluto.service.AttributeTypeService;
import com.architech.pluto.service.ObjectTypeService;

@RestController
@RequestMapping("/objectType")
public class ObjectTypeController {
	@Autowired
	ObjectTypeService objectTypeService;
	@Autowired
	AttributeTypeObjectTypeService attributeTypeObjectTypeService;
	
	@Autowired
	AttributeTypeService attributeTypeService;

    @GetMapping("/getAll")
    public List<ObjectType> list() {
        return objectTypeService.listAllObjectType();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<ObjectTypeRequestObject> get(@PathVariable Integer id) {
        try {
        	ObjectType objectType = objectTypeService.getObjectType(id);
        	Iterable<Integer> attrIds =  attributeTypeObjectTypeService.getAttributeTypeObjectTypeByObjectTypeId(id);
        	ObjectTypeRequestObject returnObject = new ObjectTypeRequestObject();
        	returnObject.setObjectType(objectType);
        	returnObject.setAttributesSelected(attrIds);
            return new ResponseEntity<ObjectTypeRequestObject>(returnObject, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<ObjectTypeRequestObject>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/getAttribute/{id}")
    public ResponseEntity<ObjectTypeRequestObject> getAttributes(@PathVariable Integer id) {
        try {
        	Iterable<Integer> attrIds =  attributeTypeObjectTypeService.getAttributeTypeObjectTypeByObjectTypeId(id);
        	
        	List<AttributeType> attrArr = attributeTypeService.getAttributeTypeByIds(attrIds);
        	
        	ObjectTypeRequestObject returnObj = new ObjectTypeRequestObject();
        	returnObj.setAttributeTypes(attrArr);
        	
            return new ResponseEntity<ObjectTypeRequestObject>(returnObj, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<ObjectTypeRequestObject>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/createObjectType")
    public void add(@RequestBody ObjectTypeRequestObject objectTypeRequestObject) {
    	ObjectType objectType = new ObjectType();
    	objectType.setName(objectTypeRequestObject.getName());
    	objectTypeService.saveObjectType(objectType);
    	
    	Iterable<Integer> ids = objectTypeRequestObject.getAttributesSelected();
    	for(Integer id: ids){
    		
    		AttributeTypeObjectType attributeTypeObjectType = new AttributeTypeObjectType();
    		attributeTypeObjectType.setAttributeTypeId(id);
    		attributeTypeObjectType.setObjectTypeId(objectType.getId());
    		attributeTypeObjectTypeService.saveAttributeTypeObjectType(attributeTypeObjectType);
    	}
    	
    }
    
    @PostMapping("/updateObjectType/{id}")
    public ResponseEntity<?> update(@RequestBody ObjectType objectType, @PathVariable Integer id) {
        try {
        	ObjectType existObjectType = objectTypeService.getObjectType(id);
        	existObjectType.setName(objectType.getName());            
            objectTypeService.saveObjectType(existObjectType);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/deleteObjectType/{id}")
    public void delete(@PathVariable Integer id) {

    	objectTypeService.deleteObjectType(id);
    }
    @PostMapping("/deleteObjectTypes")
    public void deleteMultiples(@RequestBody RequestObject requestBody) {
    	Iterable<Integer> ids = requestBody.getData();
    	objectTypeService.deleteObjectTypes(ids);
    }
    
    public User getCurrentUser(@AuthenticationPrincipal User user) {
        return user;
    }
}
