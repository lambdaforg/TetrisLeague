package tetris.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tetris.model.entity.SecurityQuestion;
import tetris.model.entity.User;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Integer id;

    private String username;
    private String login;
    private String email;
    private Date created_At;





    private SecurityQuestion question1;
    private SecurityQuestion question2;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Integer id, String username, String password,
                           String login, Date created_At, SecurityQuestion question1, SecurityQuestion question2,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.login = login;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.created_At = created_At;
        this.question1 = question1;
        this.question2 = question2;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getLogin(),
                user.getCreated_At(),
                user.getQuestion1(),
                user.getQuestion2(),
                authorities);
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }


    public Integer getId() {
        return id;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    public String getLogin() {
        return login;
    }


    public Date getCreated_At() {
        return created_At;
    }


    public SecurityQuestion getQuestion1() {
        return question1;
    }


    public SecurityQuestion getQuestion2() {
        return question2;
    }

}

