package com.architech.pluto.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.architech.pluto.model.Relationship;

public interface RelationshipRepository extends JpaRepository<Relationship, Integer> {

}
