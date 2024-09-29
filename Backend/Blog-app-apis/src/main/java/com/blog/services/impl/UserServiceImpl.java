package com.blog.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.config.AppConstants;
import com.blog.entities.Role;
import com.blog.entities.User;
import com.blog.payloads.userDto;
import com.blog.repositories.RoleRepo;
import com.blog.repositories.UserRepo;
import com.blog.services.UserService;
import com.blog.exceptions.*;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Override
	public userDto createUser(userDto userdto) {
		// TODO Auto-generated method stub
		User user = this.dtoToUser(userdto);
		User savedUser = this.userRepo.save(user);
		return this.userTodto(savedUser);
	}

	@Override
	public userDto updateUser(userDto userDto, Integer user_id) {
		// TODO Auto-generated method stub
		User user = this.userRepo.findById(user_id).orElseThrow(()-> new ResourceNotFoundException("User","id",user_id));
		 
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setAbout(userDto.getAbout());
		User upadatedUser = this.userRepo.save(user);
		userDto userDto1 = this.userTodto(upadatedUser);
		return userDto1;
	}

	@Override
	public userDto getUserById(Integer user_id) {
		// TODO Auto-generated method stub
		User user = this.userRepo.findById(user_id).orElseThrow(()->new ResourceNotFoundException("User", "User_id", user_id));
		
		return this.userTodto(user);
	}

	@Override
	public List<userDto> getAllUser() {
		// TODO Auto-generated method stub
		List<User> users = this.userRepo.findAll();
		List<userDto> userdtos = users.stream().map(user->this.userTodto(user)).collect(Collectors.toList());
		return userdtos;
	}

	@Override
	public void deleteUser(Integer user_id) {
		User user = this.userRepo.findById(user_id).orElseThrow(()->new ResourceNotFoundException("User", "User_id", user_id));
		this.userRepo.delete(user);
		// TODO Auto-generated method stub

	}
	
	public User dtoToUser(userDto userDto)
	{
			User user = this.modelMapper.map(userDto, User.class);
			
//			user.setUser_id(userDto.getUser_id());
//			user.setName(userDto.getName());
//			user.setEmail(userDto.getEmail());
//			user.setPassword(userDto.getPassword());
//			user.setAbout(userDto.getAbout());
			
			return user;
			
	}
	
	public userDto userTodto(User user)
	{
		userDto userdto = this.modelMapper.map(user, userDto.class);
		
//		userdto.setUser_id(user.getUser_id());
//		userdto.setName(user.getName());
//		userdto.setEmail(user.getEmail());
//		userdto.setPassword(user.getPassword());
//		userdto.setAbout(user.getAbout());
		
		return userdto;
	}

	@Override
	public userDto registerNewUser(userDto userdto) {
		// TODO Auto-generated method stub
		
		User user = this.modelMapper.map(userdto, User.class);
		
		//encoded the password
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		
		//roles
		Role role = this.roleRepo.findById(AppConstants.NORMAL_USER).get();
		
		user.getRoles().add(role);
		
		User newUser = this.userRepo.save(user);
		
		return this.modelMapper.map(newUser,userDto.class);
	}

}
