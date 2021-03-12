package com.architech.pluto.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "combinations")
public class Combination {

	private int id;
	private int relationshipTypeId;
	private int fromObjectTypeId;
	private int toObjectTypeId;
	/**
	 * @return the relationshipTypeId
	 */
	public int getRelationshipTypeId() {
		return relationshipTypeId;
	}
	/**
	 * @param relationshipTypeId the relationshipTypeId to set
	 */
	public void setRelationshipTypeId(int relationshipTypeId) {
		this.relationshipTypeId = relationshipTypeId;
	}
	/**
	 * @return the id
	 */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the fromObjectTypeId
	 */
	public int getFromObjectTypeId() {
		return fromObjectTypeId;
	}
	/**
	 * @param fromObjectTypeId the fromObjectTypeId to set
	 */
	public void setFromObjectTypeId(int fromObjectTypeId) {
		this.fromObjectTypeId = fromObjectTypeId;
	}
	/**
	 * @return the toObjectTypeId
	 */
	public int getToObjectTypeId() {
		return toObjectTypeId;
	}
	/**
	 * @param toObjectTypeId the toObjectTypeId to set
	 */
	public void setToObjectTypeId(int toObjectTypeId) {
		this.toObjectTypeId = toObjectTypeId;
	}
}
