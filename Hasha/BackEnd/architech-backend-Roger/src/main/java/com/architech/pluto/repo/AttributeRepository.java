/**
 * 
 */
package com.architech.pluto.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.architech.pluto.model.Attribute;

/**
 * @author Attribute
 *
 */

public interface AttributeRepository extends JpaRepository<Attribute, Integer> {
	
}
