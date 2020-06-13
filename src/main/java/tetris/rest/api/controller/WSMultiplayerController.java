package tetris.rest.api.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WSMultiplayerController {

    @MessageMapping("/send/{gameId}")
    @SendTo("/multiplayer/get/{gameId}")
    public Integer sendScore(@DestinationVariable("gameId") String gameId, @Payload Integer score) throws Exception {
        System.out.println(gameId + ", it works!");
        return score;
    }

}
