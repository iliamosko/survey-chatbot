package com.ilia.bot.chatBot.models;

import java.util.Random;

public class Confederate {

    private String side;
    private int id;
    private boolean hates;


    private final String[] sides = {"Republican", "Democrat"};
    private Random ran = new Random();

    //Initializes the Confederate with 2 random criteria. (either republican or democrat/ hates or loves them)
    public Confederate(){

        //random selection between the 2 parties
        int n = ran.nextInt(1);
        this.side = sides[n];

        //random selection to either like or hate one of the parties
        int j = ran.nextInt(10);
        if(j >=5 )
            this.hates = false;
        else
            this.hates = true;


    }


}
