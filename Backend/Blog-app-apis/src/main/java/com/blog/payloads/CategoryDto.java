package com.blog.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {

	
	private int categoryId;
	@NotBlank
	@Size(min=4,max=30)
	private String categoryTitle;
	
	@NotBlank
	@Size(min =10,max=100)
	private String categoryDescription;
}
