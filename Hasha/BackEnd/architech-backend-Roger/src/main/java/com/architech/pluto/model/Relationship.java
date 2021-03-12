package com.architech.pluto.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "relationship")
public class Relationship {
	private int id;
	private String name;
	private int fromObjectId;
	private int toObjectId;
	private int relationshipTypeId;
	private Date createdAt;
	private int createdByUserId;
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
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the fromObjectId
	 */
	public int getFromObjectId() {
		return fromObjectId;
	}
	/**
	 * @param fromObjectId the fromObjectId to set
	 */
	public void setFromObjectId(int fromObjectId) {
		this.fromObjectId = fromObjectId;
	}
	/**
	 * @return the toObjectId
	 */
	public int getToObjectId() {
		return toObjectId;
	}
	/**
	 * @param toObjectId the toObjectId to set
	 */
	public void setToObjectId(int toObjectId) {
		this.toObjectId = toObjectId;
	}
	/**
	 * @return the relationShipTypeId
	 */
	public int getRelationshipTypeId() {
		return relationshipTypeId;
	}
	/**
	 * @param relationShipTypeId the relationShipTypeId to set
	 */
	public void setRelationshipTypeId(int relationshipTypeId) {
		this.relationshipTypeId = relationshipTypeId;
	}
	/**
	 * @return the createdAt
	 */
	public Date getCreatedAt() {
		return createdAt;
	}
	/**
	 * @param createdAt the createdAt to set
	 */
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	/**
	 * @return the createdByUserId
	 */
	public int getCreatedByUserId() {
		return createdByUserId;
	}
	/**
	 * @param createdByUserId the createdByUserId to set
	 */
	public void setCreatedByUserId(int createdByUserId) {
		this.createdByUserId = createdByUserId;
	}
}
