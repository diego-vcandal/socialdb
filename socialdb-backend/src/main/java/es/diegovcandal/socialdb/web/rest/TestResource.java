package es.diegovcandal.socialdb.web.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestResource {

	@GetMapping(value = "/test")
	@ResponseStatus(HttpStatus.OK)
	public String test() {
		return "Hello world";
	}

}
