package com.ilia.bot.chatBot.services;

import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.AppendValuesResponse;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.ilia.bot.chatBot.config.GoogleApiConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class GoogleSheetService {
    @Autowired
    private GoogleApiConfig conf;

    private String spreadSheetId = "1yvq1ffnPtkWEpqW99szcCljEwYjTS6mUc9ScP3YlCoc";

    private Sheets googleSheet;




    @PostConstruct
    public void init() throws Exception{
        googleSheet = new Sheets.Builder(conf.netHttpTransport(),conf.jacksonFactory(),conf.googleCredential())
        .setApplicationName("Chatbot-Chat")
        .build();
    }

    public void addToSpread(String convoId, String s) throws Exception{
        long milliSeconds = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

        Date resultDate = new Date(milliSeconds);
        List<List<Object>> values = Arrays.asList(
                Arrays.asList(new String[] {convoId.substring(0,8), sdf.format(resultDate),s})
                // Additional rows ...
        );

        ValueRange body = new ValueRange().setValues(values);
        AppendValuesResponse result = googleSheet.spreadsheets().values().append(spreadSheetId,"Sheet1", body)
                .setValueInputOption("RAW")
                .execute();
    }
}
