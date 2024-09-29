package com.blog.controllers;

import javax.xml.stream.events.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.entities.Comments;
import com.blog.payloads.ApiResponse;
import com.blog.payloads.CommentDto;
import com.blog.services.CommentService;

@RestController
@RequestMapping("/api/")
public class CommentCOntroller {
	
	@Autowired
	private CommentService commentService;
	
	@PostMapping("/post/{postId}/comments")
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto comment,@PathVariable Integer postId)
	{
		CommentDto comment2 = this.commentService.createComment(comment, postId);
		return new ResponseEntity<CommentDto>(comment2,HttpStatus.CREATED);
	}

	@PostMapping("/post/{commentId}")
	public ResponseEntity<ApiResponse> deleteComment(@RequestBody CommentDto comment,@PathVariable Integer commentId)
	{
		this.commentService.deleteCOmment(commentId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Comment Deleted",true),HttpStatus.CREATED);
	}
}
