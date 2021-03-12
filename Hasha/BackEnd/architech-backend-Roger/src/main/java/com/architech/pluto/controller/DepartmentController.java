package com.architech.pluto.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.architech.pluto.model.Department;
import com.architech.pluto.model.User;
import com.architech.pluto.service.DepartmentService;
import com.architech.pluto.service.UserService;

@RestController
@RequestMapping("/departments")
public class DepartmentController {
	@Autowired
    DepartmentService departmentService;

    @GetMapping("")
    public List<Department> list() {
        return departmentService.listAllDepartment();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> get(@PathVariable Integer id) {
        try {
        	Department department = departmentService.getDepartment(id);
            return new ResponseEntity<Department>(department, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Department>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/")
    public void add(@RequestBody Department department) {
        departmentService.saveDepartment(department);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Department department, @PathVariable Integer id) {
        try {
            Department existDepartment = departmentService.getDepartment(id);
            department.setId(id);            
            departmentService.saveDepartment(department);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {

        departmentService.deleteDepartment(id);
    }
}
