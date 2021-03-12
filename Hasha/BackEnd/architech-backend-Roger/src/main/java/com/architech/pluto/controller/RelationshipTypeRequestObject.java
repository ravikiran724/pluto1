package com.architech.pluto.controller;

import com.architech.pluto.model.Combination;
import com.architech.pluto.model.RelationshipType;

public class RelationshipTypeRequestObject {
	private Iterable<Integer> data;
	private Iterable<Combination> combinations;
	private RelationshipType relationshipType;
	
	public Iterable<Integer> getData() {
		return data;
	}

	public void setData(Iterable<Integer> data) {
		this.data = data;
	}

	public Iterable<Combination> getCombinations() {
		return combinations;
	}

	public void setCombinations(Iterable<Combination> combinations) {
		this.combinations = combinations;
	}

	public RelationshipType getRelationshipType() {
		return relationshipType;
	}

	public void setRelationshipType(RelationshipType relationshipType) {
		this.relationshipType = relationshipType;
	}
}
