package com.github.rogeryk.charity.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Version;

import lombok.Data;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class News {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String img;

    @Column(columnDefinition = "text")
    private String content;

    private String introduce;

    @Version
    private int version;

    @CreatedDate
    private Date createdTime;

    private int watchCount = 0;

    private int favorCount = 0;

    private int commentCount = 0;

    @ManyToOne
    private User author;

    @JsonIgnore
    @OneToMany(mappedBy = "news")
    private List<Comment> comments;

}
