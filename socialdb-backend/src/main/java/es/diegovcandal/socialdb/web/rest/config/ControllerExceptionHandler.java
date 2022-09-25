package es.diegovcandal.socialdb.web.rest.config;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import es.diegovcandal.socialdb.exceptions.NotAuthorizedException;
import es.diegovcandal.socialdb.web.rest.dto.ErrorDTO;

@RestControllerAdvice
public class ControllerExceptionHandler {

	private static final String NOT_AUTHORIZED_EXCEPTION_ID = "exceptions.NotAuthorizedException";

	@Autowired
	private MessageSource messageSource;

	@ExceptionHandler(NotAuthorizedException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ResponseBody
	public ErrorDTO handleNotAuthorizedException(NotAuthorizedException exception, Locale locale) {

		String errorMessage = messageSource.getMessage(NOT_AUTHORIZED_EXCEPTION_ID, null, NOT_AUTHORIZED_EXCEPTION_ID,
				locale);

		return new ErrorDTO(errorMessage);

	}

}
