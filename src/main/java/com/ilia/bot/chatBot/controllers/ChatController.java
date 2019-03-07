package com.ilia.bot.chatBot.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class ChatController {

    @RequestMapping("/chat")
    public ModelAndView test(){
        ModelAndView mav = new ModelAndView("chat.html");

        return mav;
    }

}
