package com.blog.controllers;

import java.net.http.HttpRequest;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.payloads.ApiResponse;
import com.blog.payloads.userDto;
import com.blog.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	//create user
	@PostMapping("/")
	public ResponseEntity<userDto> createUser(@Valid @RequestBody userDto dto)
	{
		userDto createdDto = this.userService.createUser(dto);
		return new ResponseEntity<userDto>(createdDto,HttpStatus.CREATED);
	}
	
	//update user
	@PutMapping("/{userId}")
	public ResponseEntity<userDto> updateUser(@Valid @RequestBody userDto dto,@PathVariable Integer userId)
	{
		userDto updatedDto = this.userService.updateUser(dto,userId);
		return ResponseEntity.ok(updatedDto);
	}
	
	//delete user
	@PreAuthorize("hasRole('Admin')")
	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable Integer userId)
	{
		this.userService.deleteUser(userId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("User deleted sucessfully",true),HttpStatus.OK);
	}	
	
	//user get
	@GetMapping("/")
	public ResponseEntity<List<userDto>> getAllUsers()
	{
		return ResponseEntity.ok(this.userService.getAllUser());
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<userDto> getSingleUser(@PathVariable Integer userId)
	{
		return ResponseEntity.ok(this.userService.getUserById(userId));
	}

}
