package es.diegovcandal.socialdb.web.rest;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import es.diegovcandal.socialdb.application.ProyectConstants;
import es.diegovcandal.socialdb.exceptions.NotAuthorizedException;
import es.diegovcandal.socialdb.web.rest.util.RestUtils;

@RestController
@RequestMapping("/api/user")
public class UserResource {

	@Autowired
	private RestUtils restUtils;

	@Autowired
	private RestTemplate restTemplate;

	@GetMapping(value = "/identity")
	@ResponseStatus(HttpStatus.OK)
	public Object getUser(OAuth2AuthenticationToken authentication) throws NotAuthorizedException {

		String token = restUtils.getToken(authentication);

		return restUtils.doExchange(ProyectConstants.REDDIT_BASE_OAUTH_URL + "api/v1/me", HttpMethod.GET,
				restUtils.getHeaders(token), Object.class).getBody();

	}

	@PostMapping(value = "/logout")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void logout(OAuth2AuthenticationToken authentication, HttpServletResponse response)
			throws NotAuthorizedException {

		String token = restUtils.getToken(authentication);
		String refreshToken = restUtils.getToken(authentication, true);

		restTemplate
				.postForObject(ProyectConstants.REDDIT_BASE_URL + "api/v1/revoke_token",
						new HttpEntity<>(String.format("token=%s&token_type_hint=access_token", token),
								restUtils.getHeaders(token, MediaType.APPLICATION_FORM_URLENCODED, true)),
						Object.class);

		restTemplate
				.postForObject(ProyectConstants.REDDIT_BASE_URL + "api/v1/revoke_token",
						new HttpEntity<>(String.format("token=%s&token_type_hint=refresh_token", refreshToken),
								restUtils.getHeaders(token, MediaType.APPLICATION_FORM_URLENCODED, true)),
						Object.class);

		response.addCookie(restUtils.deleteSessionCookie());

	}

	@GetMapping(value = "/{userName}/saved-posts")
	@ResponseStatus(HttpStatus.OK)
	public Object getSavedPosts(OAuth2AuthenticationToken authentication, @PathVariable String userName,
			@RequestParam(required = false) String after, @RequestParam(required = false) String before)
			throws NotAuthorizedException {

		String token = restUtils.getToken(authentication);

		String baseUrl = ProyectConstants.REDDIT_BASE_OAUTH_URL + "user/" + userName + "/saved";

		return restUtils.doExchange(
				baseUrl + (after != null ? restUtils.addParam("after", after, true)
						: restUtils.addParam("before", before, false)),
				HttpMethod.GET, restUtils.getHeaders(token), Object.class).getBody();

	}

}
