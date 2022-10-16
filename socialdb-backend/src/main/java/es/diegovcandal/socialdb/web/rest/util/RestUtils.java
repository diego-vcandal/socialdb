package es.diegovcandal.socialdb.web.rest.util;

import java.util.Base64;

import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import es.diegovcandal.socialdb.application.AppConfig;
import es.diegovcandal.socialdb.exceptions.NotAuthorizedException;
import es.diegovcandal.socialdb.oauth2.config.RedditOAuth2Config;

@Component
public class RestUtils {

	@Autowired
	private AppConfig appConfig;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private OAuth2AuthorizedClientService authorizedClientService;

	@Autowired
	private RedditOAuth2Config redditOAuth2Config;

	public MultiValueMap<String, String> getHeaders(String token) {
		return getHeaders(token, MediaType.APPLICATION_JSON, false);
	}

	public MultiValueMap<String, String> getHeaders(String token, MediaType mediaType) {
		return getHeaders(token, mediaType, false);
	}

	public MultiValueMap<String, String> getHeaders(String token, MediaType mediaType, boolean isAuthBasic) {

		MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
		headers.add(HttpHeaders.USER_AGENT, appConfig.getUserAgent());

		if (isAuthBasic) {
			String tokenDecoded = String.format("%s:%s", redditOAuth2Config.getClientId(),
					redditOAuth2Config.getClientSecret());
			headers.set(HttpHeaders.AUTHORIZATION,
					String.format("Basic %s", Base64.getEncoder().encodeToString(tokenDecoded.getBytes())));

		} else if (token != null) {
			headers.set(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", token));
		}

		if (mediaType != null) {
			headers.add(HttpHeaders.CONTENT_TYPE, mediaType.toString());
		} else {
			headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());
		}

		return headers;
	}

	public <T> ResponseEntity<T> doExchange(String url, HttpMethod method, MultiValueMap<String, String> headers,
			Class<T> classType) {
		return restTemplate.exchange(url, method, new HttpEntity<Object>(headers), classType);
	}

	public String getToken(OAuth2AuthenticationToken auth, boolean required) throws NotAuthorizedException {
		return getToken(auth, false, required);
	}

	public String getToken(OAuth2AuthenticationToken auth, boolean refreshToken, boolean required)
			throws NotAuthorizedException {

		if (auth == null) {
			if (required) {
				throw new NotAuthorizedException();
			} else {
				return null;
			}
		}

		String token = refreshToken ? this.getRefreshTokenValue(auth) : this.getAccessTokenValue(auth);

		if (token == null) {
			throw new NotAuthorizedException();
		}

		return token;

	}

	public String getAccessTokenValue(OAuth2AuthenticationToken auth) {
		OAuth2AuthorizedClient authorizedClient = this.authorizedClientService
				.loadAuthorizedClient(auth.getAuthorizedClientRegistrationId(), auth.getName());

		return authorizedClient == null ? null : authorizedClient.getAccessToken().getTokenValue();
	}

	public String getRefreshTokenValue(OAuth2AuthenticationToken auth) {
		OAuth2AuthorizedClient authorizedClient = this.authorizedClientService
				.loadAuthorizedClient(auth.getAuthorizedClientRegistrationId(), auth.getName());

		if (authorizedClient == null || authorizedClient.getRefreshToken() == null) {
			return null;
		}

		return authorizedClient.getRefreshToken().getTokenValue();
	}

	public String addParam(String paramName, String paramValue, boolean first) {
		String concatParam = first ? "?" : "&";
		return paramValue == null ? "" : concatParam + paramName + "=" + paramValue;
	}

	public Cookie deleteSessionCookie() {

		Cookie cookie = new Cookie("JSESSIONID", "");
		cookie.setMaxAge(0);
		cookie.setPath("/");

		return cookie;
	}

}
