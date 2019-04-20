package com.github.rogeryk.charity.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.Data;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Comment {

    @Id
    @GeneratedValue
    private Long id;

    private String content;

    @JsonIgnore
    @ManyToOne
    private Project project;

    @ManyToOne
    private User commenter;

    @OneToOne
    private Comment replyComment;

    @OneToMany(mappedBy = "parentComment")
    private List<Comment> subComment;

    @JsonIgnore
    @ManyToOne
    private Comment parentComment;

    @CreatedDate
    private Date createdTime;

    @Override
    public String toString() {
        return "{" + "id:" + id + ",content:" + content + ",cteatedTime:" + createdTime.toString() + "}";
    }
}