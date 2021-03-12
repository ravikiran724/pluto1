package com.architech.pluto.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "relationship_type")
public class RelationshipType {
	private int id;
	private String name;
	private String aToBDescription;
	private String bToADescription;
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
	 * @return the aToBDescription
	 */
	public String getaToBDescription() {
		return aToBDescription;
	}
	/**
	 * @param aToBDescription the aToBDescription to set
	 */
	public void setaToBDescription(String aToBDescription) {
		this.aToBDescription = aToBDescription;
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
	 * @return the bToADescription
	 */
	public String getbToADescription() {
		return bToADescription;
	}
	/**
	 * @param bToADescription the bToADescription to set
	 */
	public void setbToADescription(String bToADescription) {
		this.bToADescription = bToADescription;
	}
}
