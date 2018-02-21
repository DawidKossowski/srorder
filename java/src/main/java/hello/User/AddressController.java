package hello.User;

import hello.orders.OrdersController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /demo (after Application path)
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    private static final Logger LOG = LoggerFactory.getLogger(OrdersController.class);

    @RequestMapping(path= "/createAddress")
    public @ResponseBody Address creareAddress(@RequestParam String placeId, @RequestParam String name, @RequestParam String surname ) {

        for (Address a :addressRepository.findAll()) {
            if(a.getAddress() == placeId) {

                LOG.info("added referention to an old address");
                return a;
            }
        }

            Address address = new Address();
            address.setAddress(placeId);
            address.setName(name);
            address.setSurname(surname);

            addressRepository.save(address);
            LOG.info("new address created");
            return address;

    }

    @RequestMapping(path = "/getAddress")
    public @ResponseBody Address getAddress(@RequestParam Integer id) {
        for (Address a :addressRepository.findAll()) {
            if(a.getId() == id) {

                return a;
            }
        }
        return null;
    }


}
