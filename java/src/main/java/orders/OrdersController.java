package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /demo (after Application path)
public class OrdersController {

    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private OrdersRepository ordersRepository;
    private static final Logger LOG = LoggerFactory.getLogger(OrdersController.class);



    @RequestMapping(path="/createOrder")
    public @ResponseBody String createOrder(@RequestParam int[] products) {
        LOG.warn("x");
        return "Created";
    }

    @RequestMapping(path="/api/createOrder")
    public @ResponseBody String createOrders(@RequestParam int[] products) {
        LOG.warn("xx");
        return "Created";
    }
}
