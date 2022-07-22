package edu.neu.demo.services;

import edu.neu.demo.models.Widget;
import edu.neu.demo.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

//    private List<Widget> widgets = new ArrayList<Widget>();
//    {
//        Widget w1 = new Widget(1001l, "62d879b97e19dc0017e2c8e1", "HEADING", 10, "This is header 1");
//        Widget w2 = new Widget(1002l, "62d879b97e19dc0017e2c8e1", "HEADING", 10, "This is header 2");
//        Widget w3 = new Widget(1003l, "62d879bb7e19dc0017e2c8e2", "PARAGRAPH", 4, "This is paragraph 1");
//        Widget w4 = new Widget(1004l, "62d879bb7e19dc0017e2c8e2", "PARAGRAPH", 16, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet architecto eaque excepturi harum, illum ipsum iure minus officia quidem sequi suscipit tenetur! Aliquam atque commodi distinctio, doloremque quae rem.");
//
//        widgets.add(w1);
//        widgets.add(w2);
//        widgets.add(w3);
//        widgets.add(w4);
//    }

    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
//        return widgets;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);

//        List<Widget> ws = new ArrayList<>();
//        for(Widget w: widgets) {
//            if(w.getTopicId().equals(topicId))
//                ws.add(w);
//        }
//        return ws;
    }

    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);

//        widget.setTopicId(topicId);
//        widget.setId((new Date()).getTime());
//        widgets.add(widget);
//        return widget;
    }

    public Integer deleteWidget(Long widgetId) {
        repository.deleteById(widgetId);
        return 1;

//        for(int i = 0; i < widgets.size(); i++) {
//            if(widgets.get(i).getId().equals(widgetId)) {
//                widgets.remove(i);
//                return 1;
//            }
//        }
//        return -1;
    }

    public Integer updateWidget(Long widgetId, Widget widget) {
        Widget originalWidget = repository.findById(widgetId).get();

        // TODO: copy all other fields testing for null
        originalWidget.setText(widget.getText());

        repository.save(originalWidget);
        return 1;


//        for(int i = 0; i < widgets.size(); i++) {
//            if(widgets.get(i).getId().equals(widgetId)) {
//                widgets.set(i, widget);
//                return 1;
//            }
//        }
//        return -1;
    }
}
