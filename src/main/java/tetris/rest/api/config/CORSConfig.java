package tetris.rest.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry){
    String origin = "http://localhost:4200";
    registry.addMapping("/api/**")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowedOrigins(origin);
  }
}
