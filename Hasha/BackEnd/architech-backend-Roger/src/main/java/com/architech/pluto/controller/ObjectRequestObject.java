package com.architech.pluto.controller;

import java.util.List;

import com.architech.pluto.model.Attribute;
import com.architech.pluto.model.AttributeType;
import com.architech.pluto.model.Object;

public class ObjectRequestObject {
	
	private Object object;
	private List<Attribute> attributes;
	private List<AttributeType> attributeTypes;
	
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	public List<Attribute> getAttributes() {
		return attributes;
	}
	public void setAttributes(List<Attribute> attributes) {
		this.attributes = attributes;
	}
	public List<AttributeType> getAttributeTypes() {
		return attributeTypes;
	}
	public void setAttributeTypes(List<AttributeType> attributeTypes) {
		this.attributeTypes = attributeTypes;
	}
	
}
