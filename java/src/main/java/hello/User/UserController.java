package hello.User;


import hello.orders.OrdersController;
import hello.products.ProductController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /demo (after Application path)
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private User_AdressRepository user_adressRepository;

    @Autowired
    private OrdersController ordersController;
    @Autowired
    private AdressController adressController;



    private static final Logger LOG = LoggerFactory.getLogger(ProductController.class);


    @GetMapping(path="/registration")
    public @ResponseBody String createNewUser(@RequestParam String name, @RequestParam String surname,
                                               @RequestParam String sex, @RequestParam String email,
                                               @RequestParam String password,
                                               @RequestParam String adress) {
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setSex(sex);
        user.setEmail(email);
        user.setPassword(password);

       userRepository.save(user);


       User_Adress user_adress = new User_Adress();
       user_adress.setAdress(adressController.creareAdress(adress));
       user_adress.setUser(user);

       user_adressRepository.save(user_adress);


        return "new user created";
    }
}
