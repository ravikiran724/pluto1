package com.architech.pluto.controller;

import java.util.List;

import com.architech.pluto.model.Object;
import com.architech.pluto.model.Relationship;
import com.architech.pluto.model.RelationshipType;
import com.architech.pluto.model.User;

public class RelationshipRequestObject {

	private List<Relationship> relationships;
	private List<User> users;
	private List<RelationshipType> relationshipTypes;
	private List<Object> objects;
	public List<Relationship> getRelationships() {
		return relationships;
	}
	public void setRelationships(List<Relationship> relationships) {
		this.relationships = relationships;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public List<RelationshipType> getRelationshipTypes() {
		return relationshipTypes;
	}
	public void setRelationshipTypes(List<RelationshipType> relationshipTypes) {
		this.relationshipTypes = relationshipTypes;
	}
	public List<Object> getObjects() {
		return objects;
	}
	public void setObjects(List<Object> objects) {
		this.objects = objects;
	}
}
