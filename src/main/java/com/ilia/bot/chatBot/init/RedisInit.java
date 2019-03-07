package com.ilia.bot.chatBot.init;

import org.springframework.context.annotation.Bean;
import redis.embedded.RedisServer;


public class RedisInit {

    @Bean(initMethod = "init")
    public RedisInit redisInit(){
        return new RedisInit();
    }

    public void init(){
        RedisServer redisServer = new RedisServer(6379);
        redisServer.start();
    }

}
