package com.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.payloads.ApiResponse;
import com.blog.payloads.CategoryDto;
import com.blog.payloads.userDto;
import com.blog.services.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
public class CotegoryController {
	
	@Autowired
	private CategoryService categoryService;

	//create user
	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto dto)
	{
		CategoryDto createcategory = this.categoryService.createCategory(dto);
		
		return new ResponseEntity<CategoryDto>(createcategory,HttpStatus.CREATED);
		
	}
	
	//update
	
	@PutMapping("/{catId}")
	public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto dto,@PathVariable Integer catId)
	{
		CategoryDto updatecategory = this.categoryService.updateCategory(dto,catId);
		
		return new ResponseEntity<CategoryDto>(updatecategory,HttpStatus.OK);
		
	}
	
	//delete 
	@DeleteMapping("/{catId}")
	public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Integer catId)
	{
		this.categoryService.deleteCategory(catId);
		
		return new ResponseEntity<ApiResponse>(new ApiResponse("Category deleted sucessfully", true),HttpStatus.OK);
		
	}
	
	//get
	
	@GetMapping("/{catId}")
	public ResponseEntity<CategoryDto> getCategory(@RequestBody CategoryDto dto,@PathVariable Integer catId)
	{
		CategoryDto getcategory = this.categoryService.getCategory(catId);
		
		return new ResponseEntity<CategoryDto>(getcategory,HttpStatus.OK);
		
	}
	
	//getall 
	
	@GetMapping("/")
	public ResponseEntity <List<CategoryDto>> getCategories()	
	{
		List<CategoryDto> categories = this.categoryService.getCategories();
		
		return ResponseEntity.ok(categories);
		
	}
	
	
	
}
