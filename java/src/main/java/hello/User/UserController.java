package hello.User;

import java.util.*;
import ch.qos.logback.core.joran.spi.ActionException;
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
    private User_AddressRepository user_addressRepository;

    @Autowired
    private AddressController addressController;



    private static final Logger LOG = LoggerFactory.getLogger(ProductController.class);


    @GetMapping(path="/registration")
    public @ResponseBody User createNewUser(@RequestParam String name,
                                            @RequestParam String surname,
                                            @RequestParam String sex,
                                            @RequestParam String email,
                                            @RequestParam String password,
                                            @RequestParam String address) {
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setSex(sex);
        user.setEmail(email);
        user.setPassword(password);
        user.setAddress(addressController.createAddress(address, name, surname));
        userRepository.save(user);

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



    @GetMapping (path= "/getUsersAddress")
    public @ResponseBody List<Address> getUsersAddress( @RequestParam Integer userId) {
        List<Address> addresses = new ArrayList<Address>();
        for (User_Address useraddress: user_addressRepository.findAll()
             ) {
            if(useraddress.getUser().getId().equals(userId)) {
                addresses.add(useraddress.getAddress());
            }
        }

        return addresses;
    }

    @GetMapping (path = "/getDefaultAddress")
    public @ResponseBody String getDefaultAddress( @RequestParam Integer userId) {
      return userRepository.findUserByIntegerId(userId).getAddress().getAddress();
    }

    @GetMapping (path = "/getUser")
    public @ResponseBody User getUserById( @RequestParam Integer userId) {
        return userRepository.findUserByIntegerId(userId);
    }

}
