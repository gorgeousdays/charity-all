package com.github.rogeryk.charity.bumo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.bumo.SDK;

@Configuration
public class BumoConfig {

    private String feeAccountAddress="buQYzuZW8XoeAGqsh7TKqAXYUWfswhPDocjA";

    private String feeAccountPrivateKey="privbwwBPvX4zwDh1nZeiEcKNRLisN5ht4hVTwwuB6BMd3n17bk84qDz";

    private String assetCode = "CHY";

    private String assetIssuer = "buQYzuZW8XoeAGqsh7TKqAXYUWfswhPDocjA";

    @Bean
    public SDK getSDK() {
        return SDK.getInstance("http://seed1.bumotest.io:26002");
    }

    public String getFeeAccountAddress() {
        return feeAccountAddress;
    }

    public String getFeeAccountPrivateKey() {
        return feeAccountPrivateKey;
    }

    public String getAssetCode() {
        return assetCode;
    }

    public String getAssetIssuer() {
        return assetIssuer;
    }
}