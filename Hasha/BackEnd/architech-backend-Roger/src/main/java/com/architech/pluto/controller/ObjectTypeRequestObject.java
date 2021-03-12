package com.architech.pluto.controller;

import com.architech.pluto.model.AttributeType;
import com.architech.pluto.model.ObjectType;

public class ObjectTypeRequestObject {
	private String name;
	private Iterable<Integer> attributesSelected;
	private ObjectType objectType;
	private Iterable<AttributeType> attributeTypes;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Iterable<Integer> getAttributesSelected() {
		return attributesSelected;
	}
	public void setAttributesSelected(Iterable<Integer> attributesSelected) {
		this.attributesSelected = attributesSelected;
	}
	public ObjectType getObjectType() {
		return objectType;
	}
	public void setObjectType(ObjectType objectType) {
		this.objectType = objectType;
	}
	public Iterable<AttributeType> getAttributeTypes() {
		return attributeTypes;
	}
	public void setAttributeTypes(Iterable<AttributeType> attributeTypes) {
		this.attributeTypes = attributeTypes;
	}
}
