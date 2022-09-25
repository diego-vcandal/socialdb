package es.diegovcandal.socialdb.application;

public class ProyectConstants {

	private ProyectConstants() {
		throw new IllegalStateException("Utility class, instantiation not supported");
	}

	public static final String REDDIT_BASE_OAUTH_URL = "https://oauth.reddit.com/";

	public static final String REDDIT_BASE_URL = "https://www.reddit.com/";

	public static final String CSRF_COOKIE_NAME = "XSRF-TOKEN";

	public static final String CSRF_HEADER_NAME = "X-XSRF-TOKEN";

}
