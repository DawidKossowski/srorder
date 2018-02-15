package hello.Customer;


import hello.orders.OrdersController;
import hello.orders.OrdersRepository;
import hello.products.ProductController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /demo (after Application path)
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    private OrdersController ordersController;

    private static final Logger LOG = LoggerFactory.getLogger(ProductController.class);


    @GetMapping(path="/createCustomer")
    public @ResponseBody String createCustomer(@RequestParam String name, @RequestParam String surname,
                                               @RequestParam String adress) {
        Customer customer = new Customer();
        customer.setAdress(adress);
        customer.setName(name);
        customer.setSurname(surname);

        customerRepository.save(customer);

        //ordersController.




        return "created";
    }
}
