package com.architech.pluto.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.User;
import com.architech.pluto.repo.UserRepository;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public List<User> listAllUser() {
		return userRepository.findAll();
	}

	public void saveUser(User user) {
		userRepository.save(user);
	}

	public User getUser(Integer id) {
		return userRepository.findById(id).get();
	}

	public void deleteUser(Integer id) {
		userRepository.deleteById(id);
	}

	public User findByUsername(String username) {

		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException(username);
		}

		return user;
	}
	
	public List<User> getUsersByIds(Iterable<Integer> ids) {
		return userRepository.findAllById(ids);
	}
	
	public User getUserByUsername(String name) {
		return userRepository.findByUsername(name);
	}
	
	public void deleteUsers(Iterable<Integer> ids) {
		List<User> users = userRepository.findAllById(ids);
		userRepository.deleteAll(users);
	}
}
