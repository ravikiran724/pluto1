package com.architech.pluto.model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "attribute_type_object_type")
public class AttributeTypeObjectType {
	private int id;
	private int attributeTypeId;
	private int objectTypeId;
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
	public int getAttributeTypeId() {
		return attributeTypeId;
	}
	/**
	 * @param attributeTypeId the attributeTypeId to set
	 */
	public void setAttributeTypeId(int attributeTypeId) {
		this.attributeTypeId = attributeTypeId;
	}
	/**
	 * @return the objectTypeId
	 */
	public int getObjectTypeId() {
		return objectTypeId;
	}
	/**
	 * @param objectTypeId the objectTypeId to set
	 */
	public void setObjectTypeId(int objectTypeId) {
		this.objectTypeId = objectTypeId;
	}
}
