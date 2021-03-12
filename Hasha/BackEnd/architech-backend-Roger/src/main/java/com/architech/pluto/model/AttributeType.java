package com.architech.pluto.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "attribute_type")
public class AttributeType {
	
	private int id;
    private String name;
    private String format;
    private String valueOption;
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
	 * @return the valueOption
	 */
	public String getValueOption() {
		return valueOption;
	}
	/**
	 * @param valueOption the valueOption to set
	 */
	public void setValueOption(String valueOption) {
		this.valueOption = valueOption;
	}
	/**
	 * @return the format
	 */
	public String getFormat() {
		return format;
	}
	/**
	 * @param format the format to set
	 */
	public void setFormat(String format) {
		this.format = format;
	}
}
