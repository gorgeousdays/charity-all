package com.github.rogeryk.charity.server.core.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.Data;

@Data
public class PageParam {

    private int page = 1;

    private int size = 12;

    private String direction = "DESC";

    private String field = "createdTime";

    public Pageable toPageable() {
       return PageRequest.of(page-1, size,
                Sort.by(Sort.Direction.fromString(direction), field));
    }
}
