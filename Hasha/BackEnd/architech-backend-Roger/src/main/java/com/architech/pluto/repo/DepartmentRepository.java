package com.architech.pluto.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.architech.pluto.model.Department;


public interface DepartmentRepository  extends JpaRepository<Department, Integer>  {

}
