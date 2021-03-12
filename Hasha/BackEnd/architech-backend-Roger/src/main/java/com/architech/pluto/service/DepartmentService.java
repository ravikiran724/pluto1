package com.architech.pluto.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.architech.pluto.model.Department;
import com.architech.pluto.repo.DepartmentRepository;


@Service
@Transactional
public class DepartmentService {
	@Autowired
	private DepartmentRepository departmentRepository;
	public List<Department> listAllDepartment() {
		return departmentRepository.findAll();
	}

	public void saveDepartment(Department user) {
		departmentRepository.save(user);
	}

	public Department getDepartment(Integer id) {
		return departmentRepository.findById(id).get();
	}

	public void deleteDepartment(Integer id) {
		departmentRepository.deleteById(id);
	}

}
