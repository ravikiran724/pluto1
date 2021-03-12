/**
 * 
 */
package com.architech.pluto.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.architech.pluto.model.User;

/**
 * @author User
 *
 */
public interface UserRepository extends JpaRepository<User, Integer> {
	User findByUsername(String username);
}
