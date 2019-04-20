package com.github.rogeryk.charity.domain.form;

import com.github.rogeryk.charity.domain.User;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class UserInfo {

    private Long id;

    private String nickname;

    private String avatar;

    private String presentation;

    private String profession;

    private String address;

    private Integer releasedProjectCount = 0;

    private Integer favorUserCount = 0;

    private Integer donatedCount = 0;

    private BigDecimal donatedMoney = BigDecimal.ZERO;

    public static UserInfo from(User user, int donatedCount, int releasedProjectCount) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setAvatar(user.getAvatar());
        userInfo.setAddress(user.getAddress());
        userInfo.setNickname(user.getNickName());
        userInfo.setPresentation(user.getPresentation());
        userInfo.setDonatedCount(donatedCount);
        userInfo.setReleasedProjectCount(releasedProjectCount);
        return userInfo;
    }

}
