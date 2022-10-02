package es.diegovcandal.socialdb.domain;

import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import es.diegovcandal.socialdb.application.ProyectConstants;

@Entity
public class User {

	@Id
	@Column(updatable = false, nullable = false)
	private String id;

	private String username;
	private String password;
	private boolean activated;

	@ManyToMany
	@JoinTable(name = "user_authority", joinColumns = @JoinColumn(name = "id"), inverseJoinColumns = @JoinColumn(name = "authority"))
	private Set<Authority> authorities;

	public User() {
	}

	public User(String id, String username, Set<Authority> authorities) {
		this.id = id;
		this.username = username;
		this.password = ProyectConstants.DEFAULT_PASSWORD;
		this.authorities = authorities;
		this.activated = true;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isActivated() {
		return activated;
	}

	public void setActivated(boolean activated) {
		this.activated = activated;
	}

	public Set<Authority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Set<Authority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public int hashCode() {
		return Objects.hash(activated, authorities, id, password, username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return activated == other.activated && Objects.equals(authorities, other.authorities)
				&& Objects.equals(id, other.id) && Objects.equals(password, other.password)
				&& Objects.equals(username, other.username);
	}

}
