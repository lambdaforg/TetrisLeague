package tetris.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import tetris.controller.UserRestController;
import tetris.data.UserRepository;
import tetris.model.entity.User;
import tetris.payloads.request.SignupRequest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRestController userRestController;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void contextLoads() throws  Exception{
        assertThat(userRestController).isNotNull();
    }

    @Test
    void registrationWorksThroughAllLayers() throws Exception {
        SignupRequest user = new SignupRequest();
        user.setLogin("test866673222");
        user.setUsername("test86667322");
        user.setPassword("passsword123");
        user.setQuestion1("What is your favourite place?");
        user.setQuestion2("What is your favourite animal?");
        user.setAnswer1("Room");
        user.setAnswer2("Dog");
        mockMvc.perform(post("/api/users/signup", 42L)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());

        User user1 = userRepository.findByUsername("test86667322").get();
        assertThat(user1.getLogin()).isEqualTo(user.getLogin());
    }
}
