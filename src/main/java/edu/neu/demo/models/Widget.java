package edu.neu.demo.models;

import javax.persistence.*;

@Entity
@Table(name="widgets")
public class Widget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topicId;
    private String type;
    private Integer size;
    private String text;
    private Integer width;
    private Integer height;
    private String src;

    public Widget() {
    }

    public Widget(Long id, String topicId, String type, Integer size, String text) {
        this.id = id;
        this.topicId = topicId;
        this.type = type;
        this.size = size;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopicId() {
        return topicId;
    }

    public void setTopicId(String topicId) {
        this.topicId = topicId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
