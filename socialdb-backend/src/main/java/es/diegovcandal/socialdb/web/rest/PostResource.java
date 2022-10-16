package es.diegovcandal.socialdb.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.diegovcandal.socialdb.application.ProyectConstants;
import es.diegovcandal.socialdb.exceptions.NotAuthorizedException;
import es.diegovcandal.socialdb.web.rest.util.RestUtils;

@RestController
@RequestMapping("/api/post")
public class PostResource {

	@Autowired
	private RestUtils restUtils;

	@GetMapping(value = "/{postId}")
	@ResponseStatus(HttpStatus.OK)
	public Object getPost(OAuth2AuthenticationToken authentication, @PathVariable String postId)
			throws NotAuthorizedException {

		String token = restUtils.getToken(authentication, false);

		return restUtils
				.doExchange(
						(token != null ? ProyectConstants.REDDIT_BASE_OAUTH_URL : ProyectConstants.REDDIT_API_URL)
								+ "api/info/?id=t3_" + postId,
						HttpMethod.GET, restUtils.getHeaders(token), Object.class)
				.getBody();

	}

}
