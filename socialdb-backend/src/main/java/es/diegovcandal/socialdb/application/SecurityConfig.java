package es.diegovcandal.socialdb.application;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.trace.http.HttpTraceRepository;
import org.springframework.boot.actuate.trace.http.InMemoryHttpTraceRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.JdbcOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import es.diegovcandal.socialdb.application.filter.CustomCsrfFilter;
import es.diegovcandal.socialdb.oauth2.CustomAuthorizationRequestResolver;
import es.diegovcandal.socialdb.oauth2.RestOAuth2AccessTokenResponseClient;
import es.diegovcandal.socialdb.oauth2.RestOAuth2UserService;
import es.diegovcandal.socialdb.oauth2.config.RedditOAuth2Config;
import es.diegovcandal.socialdb.repository.CustomAuthorityRepository;
import es.diegovcandal.socialdb.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity(debug = false)
public class SecurityConfig {

	@Autowired
	private RedditOAuth2Config redditOAuth2Config;

	@Autowired
	private AppConfig appConfig;

	@Autowired
	private ClientRegistrationRepository clientRegistrationRepository;

	@Autowired
	private CustomAuthorityRepository authorityRepository;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private DataSource dataSource;

	// @formatter:off
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors()
			.and()
				.csrf().csrfTokenRepository(csrfTokenRepository())
			.and()
				.authorizeRequests()
				.antMatchers("/actuator/**").permitAll()
				.antMatchers("/api/user/identity").permitAll()
				.antMatchers("/api/user/**").authenticated()
				.antMatchers("/oauth2/**").authenticated()
				.anyRequest().permitAll()
			.and()
				.oauth2Login(oauth2 -> 
					oauth2.authorizationEndpoint(authEndpoint -> 
						authEndpoint.authorizationRequestResolver(new CustomAuthorizationRequestResolver(clientRegistrationRepository, "/oauth2/authorization/"))
					)
				)
				.oauth2Login().tokenEndpoint().accessTokenResponseClient(new RestOAuth2AccessTokenResponseClient(restTemplate(), appConfig, redditOAuth2Config))
			.and()
				.userInfoEndpoint().userService(new RestOAuth2UserService(restTemplate(), appConfig, authorityRepository, customUserDetailsService))
			.and()
				.defaultSuccessUrl("http://localhost:4200/socialdb", true)
				.failureUrl("http://localhost:4200/socialdb")
			.and()
				.addFilterAfter(new CustomCsrfFilter(), CsrfFilter.class);

		return http.build();
	}
	// @formatter:on

	@Bean
	public HttpTraceRepository httpTraceRepository() {
		return new InMemoryHttpTraceRepository();
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {

		CorsConfiguration config = new CorsConfiguration();
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:4200");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");

		source.registerCorsConfiguration("/**", config);

		return source;

	}

	@Bean
	public OAuth2AuthorizedClientService oAuth2AuthorizedClientService(JdbcOperations jdbcOperations,
			ClientRegistrationRepository clientRegistrationRepository) {
		return new JdbcOAuth2AuthorizedClientService(jdbcOperations, clientRegistrationRepository);
	}

	@Bean
	public JdbcOperations jdbcOperations() {
		return new JdbcTemplate(dataSource);
	}

	@Bean
	public CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName(ProyectConstants.CSRF_HEADER_NAME);
		return repository;
	}

	@Bean
	public PersistentTokenRepository persistentTokenRepository() {
		JdbcTokenRepositoryImpl db = new JdbcTokenRepositoryImpl();
		db.setDataSource(dataSource);
		return db;
	}

}