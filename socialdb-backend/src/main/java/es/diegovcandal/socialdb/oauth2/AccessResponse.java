package es.diegovcandal.socialdb.oauth2;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.security.oauth2.core.OAuth2AccessToken;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AccessResponse {
	@JsonProperty("access_token")
	private String accessToken;

	@JsonProperty("token_type")
	private String tokenType;

	@JsonProperty("expires_in")
	private int expiresIn;

	@JsonProperty("refresh_token")
	private String refreshToken;

	private String scope;

	public AccessResponse() {
	}

	AccessResponse(String accessToken, String tokenType, int expiresIn, String refreshToken, String scope) {
		this.accessToken = accessToken;
		this.tokenType = tokenType;
		this.expiresIn = expiresIn;
		this.refreshToken = refreshToken;
		this.scope = scope;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public OAuth2AccessToken.TokenType getTokenType() {
		return OAuth2AccessToken.TokenType.BEARER.getValue().equalsIgnoreCase(tokenType)
				? OAuth2AccessToken.TokenType.BEARER
				: null;
	}

	public int getExpiresIn() {
		return expiresIn;
	}

	public Set<String> getScopes() {
		return scope.isEmpty() ? Collections.emptySet() : Stream.of(scope.split("\\s+")).collect(Collectors.toSet());
	}
}