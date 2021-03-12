package com.architech.pluto.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "object")
public class Object {
	
	private int id;
	private String name;
	private Date creationDate;
	private int createByUserId;
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
	 * @return the creationDate
	 */
	public Date getCreationDate() {
		return creationDate;
	}
	/**
	 * @param creationDate the creationDate to set
	 */
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	/**
	 * @return the createByUserId
	 */
	public int getCreateByUserId() {
		return createByUserId;
	}
	/**
	 * @param createByUserId the createByUserId to set
	 */
	public void setCreateByUserId(int createByUserId) {
		this.createByUserId = createByUserId;
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
