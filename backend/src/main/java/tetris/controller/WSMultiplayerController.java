package tetris.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;
import tetris.model.entity.Move;

@Controller
public class WSMultiplayerController {

    @MessageMapping("/send/{gameId}")
    @SendTo("/multiplayer/get/{gameId}")
    public Move sendMove(@DestinationVariable("gameId") String gameId, @Payload Move move) throws Exception {
        return new Move(
                HtmlUtils.htmlEscape(move.getUserId()),
                HtmlUtils.htmlEscape(move.getScore()),
                HtmlUtils.htmlEscape(move.getScoreLines()),
                HtmlUtils.htmlEscape(move.getLevel()),
                move.getBoard()
        );
    }

    @MessageMapping("/sendSignal/{gameId}")
    @SendTo("/multiplayer/signal/get/{gameId}")
    public Integer sendSignal(@DestinationVariable("gameId") String gameId, @Payload Integer userId) throws Exception {
        return userId;
    }

}
