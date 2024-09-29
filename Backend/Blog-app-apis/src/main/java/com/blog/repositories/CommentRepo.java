package com.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.entities.Comments;

public interface CommentRepo extends JpaRepository<Comments,Integer> {
	

}
