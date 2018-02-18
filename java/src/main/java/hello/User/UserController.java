package hello.User;

import java.util.*;
import ch.qos.logback.core.joran.spi.ActionException;
import hello.orders.OrdersController;
import hello.products.ProductController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private AdressController adressController;



    private static final Logger LOG = LoggerFactory.getLogger(ProductController.class);


    @GetMapping(path="/registration")
    public @ResponseBody User createNewUser(@RequestParam String name,
                                            @RequestParam String surname,
                                            @RequestParam String sex,
                                            @RequestParam String email,
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


        return user;
    }

    @GetMapping(path = "/login")
    public @ResponseBody User login (@RequestParam String email,
                                     @RequestParam String password) throws ActionException {

        for (User user : userRepository.findAll()) {
            if( email.equals(user.getEmail())) {
                if(password.equals(user.getPassword())) {
                    LOG.info("successfull login");
                    return user;
                }
                throw new WrongPasswordException();
            }
        }
        throw new UserNotFoundException();
    }



    @ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "wrong password")
    public static class WrongPasswordException extends RuntimeException {}

    @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "wrong email and password")
    public class UserNotFoundException extends RuntimeException {}

    @GetMapping (path= "/getUsersAdress")
    public @ResponseBody List<Adress> getUsersAdress( @RequestParam Integer userId) {
        List<Adress> addresses = new ArrayList<Adress>();
        for (User_Adress useradress: user_adressRepository.findAll()
             ) {
            if(useradress.getUser().getId().equals(userId)) {
                LOG.info(useradress.getAdress().getAdress());
                LOG.info(useradress.getAdress().getId() + "a");

                addresses.add(useradress.getAdress());
            }
        }

        return addresses;
    }

}
