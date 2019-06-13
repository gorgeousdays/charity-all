package com.github.rogeryk.charity.controller;

import com.github.rogeryk.charity.aop.login.LoginedUser;
import com.github.rogeryk.charity.controller.form.DonateForm;
import com.github.rogeryk.charity.controller.form.PageParam;
import com.github.rogeryk.charity.controller.form.RechargeForm;
import com.github.rogeryk.charity.domain.Transaction;
import com.github.rogeryk.charity.domain.User;
import com.github.rogeryk.charity.service.TransactionService;
import com.github.rogeryk.charity.service.UserService;
import com.github.rogeryk.charity.utils.PageData;
import com.github.rogeryk.charity.utils.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/transaction")
@Slf4j
@Validated
public class TransactionController {

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/donation")
    public Response donationRecords(@NotNull Long userId, PageParam pageParam) {
        User user = userService.findById(userId);
        Page<Transaction> transactionPage = transactionService.donationBy(user.getId(), pageParam.toPageable());
        return Response.ok(PageData.of(transactionPage));
    }

    @PostMapping("/donation")
    public Response donate(@NotNull @LoginedUser User user, @Valid @RequestBody DonateForm form) {
        log.debug(form.toString());

        transactionService.donate(user.getId(), form.getProjectId(), form.getAmount());

        return Response.ok(null);
    }

    @PostMapping("/recharge")
    public Response recharge(@NotNull @LoginedUser User user, RechargeForm form) {
        transactionService.recharge(user.getId(), form.getAmount());
        return Response.ok();
    }

}
