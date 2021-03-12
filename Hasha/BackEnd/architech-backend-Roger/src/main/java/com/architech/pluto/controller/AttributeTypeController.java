package com.architech.pluto.controller;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.architech.pluto.model.AttributeType;
import com.architech.pluto.service.AttributeTypeService;

@RestController
@RequestMapping("/attributeType")
public class AttributeTypeController {
	@Autowired
	AttributeTypeService attributeTypeService;

    @GetMapping("/getAll")
    public List<AttributeType> list() {
        return attributeTypeService.listAllAttributeType();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<AttributeType> get(@PathVariable Integer id) {
        try {
        	AttributeType attributeType = attributeTypeService.getAttributeType(id);
            return new ResponseEntity<AttributeType>(attributeType, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<AttributeType>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/createAttributeType")
    public void add(@RequestBody AttributeType attributeType) {
    	attributeTypeService.saveAttributeType(attributeType);
    }
    
    @PostMapping("/updateAttributeType/{id}")
    public ResponseEntity<?> update(@RequestBody AttributeType attributeType, @PathVariable Integer id) {
        try {
        	AttributeType existAttributeType = attributeTypeService.getAttributeType(id);
        	existAttributeType.setName(attributeType.getName());            
            attributeTypeService.saveAttributeType(existAttributeType);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/deleteAttributeType/{id}")
    public void delete(@PathVariable Integer id) {

    	attributeTypeService.deleteAttributeType(id);
    }
    @PostMapping("/deleteAttributeTypes")
    public void deleteMultiples(@RequestBody RequestObject requestBody) {
    	Iterable<Integer> ids = requestBody.getData();
    	attributeTypeService.deleteAttributeTypes(ids);
    }
    
}
