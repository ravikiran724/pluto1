package com.architech.pluto.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.architech.pluto.model.User;
import com.architech.pluto.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
    UserService userService;

    @GetMapping("/getAll")
    public List<User> list() {
        return userService.listAllUser();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<User> get(@PathVariable Integer id) {
        try {
            User user = userService.getUser(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/")
    public void add(@RequestBody User user) {
        userService.saveUser(user);
    }
    
    @PostMapping("/updateUser/{id}")
    public ResponseEntity<?> update(@RequestBody User user, @PathVariable Integer id) {
        try {
            User existUser = userService.getUser(id);
            user.setId(id);     
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/deleteUser/{id}")
    public void delete(@PathVariable Integer id) {

        userService.deleteUser(id);
    }
    @PostMapping("/deleteUsers")
    public void deleteUsers(@RequestBody RequestObject requestBody) {
    	Iterable<Integer> ids = requestBody.getData();
        userService.deleteUsers(ids);
    }
    
//    @PostMapping("/sign-in")
//    public void signIn(@RequestBody User user) {
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//        userService.saveUser(user);
//    }
    
    @PostMapping("/register")
    public void signUp(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
    }
    
    @PostMapping("/createUser")
    public void createUser(@RequestBody User user) {
    	user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    	userService.saveUser(user);
    }
}
