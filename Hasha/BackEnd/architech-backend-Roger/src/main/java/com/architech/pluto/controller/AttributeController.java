package com.architech.pluto.controller;

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

import com.architech.pluto.model.Attribute;
import com.architech.pluto.service.AttributeService;

@RestController
@RequestMapping("/attribute")

public class AttributeController {
	@Autowired
	AttributeService attributeService;

    @GetMapping("")
    public List<Attribute> list() {
        return attributeService.listAllAttribute();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attribute> get(@PathVariable Integer id) {
        try {
        	Attribute attribute = attributeService.getAttribute(id);
            return new ResponseEntity<Attribute>(attribute, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Attribute>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/")
    public void add(@RequestBody Attribute attribute) {
    	attributeService.saveAttributeType(attribute);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Attribute attribute, @PathVariable Integer id) {
        try {
        	Attribute existAttribute = attributeService.getAttribute(id);
        	attribute.setId(id);            
            attributeService.saveAttributeType(attribute);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {

    	attributeService.deleteAttribute(id);
    }
}
