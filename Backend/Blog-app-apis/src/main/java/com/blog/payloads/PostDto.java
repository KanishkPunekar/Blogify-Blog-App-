package com.blog.payloads;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.blog.entities.Category;
import com.blog.entities.Comments;
import com.blog.entities.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostDto {
	
	private Integer postId;

	private String title;
	
	
	private String content;
	
	private String imageName;
	
	private Date addDate;
	
	private CategoryDto  category;

	private userDto user;
	
	private Set<CommentDto> comments = new HashSet<>();


	
}
