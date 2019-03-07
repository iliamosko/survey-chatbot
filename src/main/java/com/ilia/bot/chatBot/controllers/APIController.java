package com.ilia.bot.chatBot.controllers;


import com.ibm.watson.developer_cloud.assistant.v1.Assistant;
import com.ibm.watson.developer_cloud.assistant.v1.model.Context;
import com.ibm.watson.developer_cloud.assistant.v1.model.InputData;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageOptions;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;

@RestController
public class APIController {
    @Value("${ibm.assistant.apiKey}")
    private String assistantApiKey;

    @Value("${ibm.assistant.url}")
    private String assistantUrl;


    protected Assistant service;

    @PostConstruct
    public void init() {
        service = new Assistant("2018-07-10");
        //service.setApiKey(assistatntApiKey);
        service.setEndPoint(assistantUrl);
        service.setUsernameAndPassword("apikey",assistantApiKey);



    }

    @PostMapping("/api/chat")
    public MessageResponse chat(@RequestBody String msg, HttpSession session){

        try {
            // first message
            MessageOptions newMessageOptions = new MessageOptions.Builder()
                    .workspaceId("4cd9cc7b-948e-4630-8282-2333fd49cbb5")
                    .input(new InputData.Builder(msg).build())
                    .context((Context)session.getAttribute( "context"))
                    .build();

            MessageResponse response = service.message(newMessageOptions).execute();
           // context = response.getContext();
            session.setAttribute("context",response.getContext());
            return response;
        } catch (Exception e){
            System.out.println(e);
        }
        return null;
    }

}
