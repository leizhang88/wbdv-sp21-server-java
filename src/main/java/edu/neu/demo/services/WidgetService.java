package edu.neu.demo.services;

import edu.neu.demo.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<Widget>();
    {
        Widget w1 = new Widget(1001l, "234x5j", "HEAD", 10, "This is header 1");
        Widget w2 = new Widget(1002l, "234x5j", "HEAD", 10, "This is header 2");
        Widget w3 = new Widget(1003l, "2lk42o", "PARAGRAPH", 4, "This is paragraph 1");
        Widget w4 = new Widget(1004l, "2lk42o", "PARAGRAPH", 16, "This is paragraph 2");

        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
    }

    public List<Widget> findAllWidges() {
        return widgets;
    }
}
