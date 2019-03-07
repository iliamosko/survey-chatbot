package com.ilia.bot.chatBot.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class FrontController {

    @GetMapping("/")
    public String front(){
        return "front";
    }

    @PostMapping("/chat")
    public String frontNext(){

        return "chat";
    }
}
