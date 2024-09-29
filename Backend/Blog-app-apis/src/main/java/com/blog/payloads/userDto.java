package com.blog.payloads;

import java.util.HashSet;
import java.util.Set;

import com.blog.entities.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class userDto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	@NotEmpty
	@Size(min=4,message = "Username must be minimum of 4 characters !!")
	private String name;
	@Email(message = "Email address is not valid")
	private String email;
	@NotEmpty(message = "Password must not be empty")
	private String password;
	@NotEmpty
	private String about;
	
	 private Set<rolesDto> roles = new HashSet<>();
	 
	 @JsonIgnore
	 public String getPassword()
	 {
		 return this.password;
	 }
	 @JsonProperty
	 public void setPassword(String password)
	 {
		 this.password = password;
	 }
}
