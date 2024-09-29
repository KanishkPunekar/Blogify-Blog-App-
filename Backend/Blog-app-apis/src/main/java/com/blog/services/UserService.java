package com.blog.services;

import java.util.List;


import com.blog.payloads.userDto;

public interface UserService {
	
	userDto registerNewUser(userDto user);

	userDto createUser(userDto user);
	userDto updateUser(userDto user,Integer user_id);
	userDto getUserById(Integer user_id);
	List<userDto> getAllUser();
	
	void deleteUser(Integer user_id);
}
