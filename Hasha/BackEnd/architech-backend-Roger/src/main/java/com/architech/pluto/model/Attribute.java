package com.architech.pluto.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "attributes")
public class Attribute {

	private int id;
    private String attributeTypeId;
    private int objectId;
    private String value;
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
	 * @return the attributeTypeId
	 */
	public String getAttributeTypeId() {
		return attributeTypeId;
	}
	/**
	 * @param attributeTypeId the attributeTypeId to set
	 */
	public void setAttributeTypeId(String attributeTypeId) {
		this.attributeTypeId = attributeTypeId;
	}
	/**
	 * @return the objectId
	 */
	public int getObjectId() {
		return objectId;
	}
	/**
	 * @param objectId the objectId to set
	 */
	public void setObjectId(int objectId) {
		this.objectId = objectId;
	}
	/**
	 * @return the value
	 */
	public String getValue() {
		return value;
	}
	/**
	 * @param value the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}
}
