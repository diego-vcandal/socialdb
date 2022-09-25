package es.diegovcandal.socialdb.web.rest.dto;

public class ErrorDTO {

	private String globalError;

	public ErrorDTO(String globalError) {
		this.globalError = globalError;
	}

	public String getGlobalError() {
		return globalError;
	}

	public void setGlobalError(String globalError) {
		this.globalError = globalError;
	}
}
