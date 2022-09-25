package es.diegovcandal.socialdb.oauth2;

import java.util.Base64;
import java.util.Set;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestOperations;

import es.diegovcandal.socialdb.application.AppConfig;
import es.diegovcandal.socialdb.oauth2.config.RedditOAuth2Config;

public class RestOAuth2AccessTokenResponseClient
		implements OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> {

	private AppConfig appConfig;
	private RedditOAuth2Config redditOAuth2Config;
	private RestOperations restOperations;

	public RestOAuth2AccessTokenResponseClient(RestOperations restOperations, AppConfig appConfig,
			RedditOAuth2Config redditOAuth2Config) {
		this.restOperations = restOperations;
		this.appConfig = appConfig;
		this.redditOAuth2Config = redditOAuth2Config;
	}

	@Override
	public OAuth2AccessTokenResponse getTokenResponse(OAuth2AuthorizationCodeGrantRequest authorizationGrantRequest)
			throws OAuth2AuthenticationException {
		ClientRegistration clientRegistration = authorizationGrantRequest.getClientRegistration();

		String tokenUri = clientRegistration.getProviderDetails().getTokenUri();

		MultiValueMap<String, String> tokenRequest = new LinkedMultiValueMap<>();
		tokenRequest.add("code",
				authorizationGrantRequest.getAuthorizationExchange().getAuthorizationResponse().getCode());
		tokenRequest.add("grant_type", clientRegistration.getAuthorizationGrantType().getValue());
		tokenRequest.add("state",
				authorizationGrantRequest.getAuthorizationExchange().getAuthorizationResponse().getState());
		tokenRequest.add("redirect_uri",
				authorizationGrantRequest.getAuthorizationExchange().getAuthorizationRequest().getRedirectUri());
		tokenRequest.add("scope", String.join(" ", authorizationGrantRequest.getClientRegistration().getScopes()));

		ResponseEntity<AccessResponse> response = restOperations.exchange(tokenUri, HttpMethod.POST,
				new HttpEntity<>(tokenRequest, getHeaders()), AccessResponse.class);

		AccessResponse accessResponse = response.getBody();

		if (accessResponse == null) {
			throw new OAuth2AuthenticationException("OAuth2 token response is null");
		}

		Set<String> scopes = authorizationGrantRequest.getAuthorizationExchange().getAuthorizationRequest().getScopes();

		return OAuth2AccessTokenResponse.withToken(accessResponse.getAccessToken())
				.tokenType(accessResponse.getTokenType()).expiresIn(accessResponse.getExpiresIn()).scopes(scopes)
				.refreshToken(accessResponse.getRefreshToken()).build();
	}

	private HttpHeaders getHeaders() {

		String tokenDecoded = String.format("%s:%s", redditOAuth2Config.getClientId(),
				redditOAuth2Config.getClientSecret());

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.USER_AGENT, appConfig.getUserAgent());
		headers.set(HttpHeaders.AUTHORIZATION,
				String.format("Basic %s", Base64.getEncoder().encodeToString(tokenDecoded.getBytes())));

		return headers;
	}

}