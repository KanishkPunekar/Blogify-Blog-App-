package com.blog.payloads;

import lombok.Data;

@Data
public class JwtAuthResponse {

	private String token;
	
	
	private userDto user;
	
	
}
