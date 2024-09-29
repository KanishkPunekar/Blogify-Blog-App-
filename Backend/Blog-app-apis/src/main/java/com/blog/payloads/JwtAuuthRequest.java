package com.blog.payloads;

import lombok.Data;

@Data
public class JwtAuuthRequest {

	private String username;
	private String password;
}
