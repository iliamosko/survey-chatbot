package com.ilia.bot.chatBot.config;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import com.google.api.services.sheets.v4.SheetsScopes;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;


@Component
public class GoogleApiConfig {

    private Set<String> googleOAuth2Scopes() {
        Set<String> googleOAuth2Scopes = new HashSet<>();
        googleOAuth2Scopes.add(SheetsScopes.DRIVE);
        googleOAuth2Scopes.add(SheetsScopes.DRIVE_FILE);
        googleOAuth2Scopes.add(SheetsScopes.SPREADSHEETS);
        return Collections.unmodifiableSet(googleOAuth2Scopes);
    }

    public GoogleCredential googleCredential() throws IOException {
        File serviceAccount = new ClassPathResource("credentials/adminChatBotCred.json").getFile();
        return GoogleCredential.fromStream(new FileInputStream(serviceAccount))
                .createScoped(googleOAuth2Scopes());
    }


    public NetHttpTransport netHttpTransport() throws GeneralSecurityException, IOException {
        return GoogleNetHttpTransport.newTrustedTransport();
    }

    public JacksonFactory jacksonFactory() {
        return JacksonFactory.getDefaultInstance();
    }
}