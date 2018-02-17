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
public class AdressController {

    @Autowired
    private AdressRepository adressRepository;

    private static final Logger LOG = LoggerFactory.getLogger(OrdersController.class);

    @RequestMapping(path= "/createAdress")
    public @ResponseBody Adress creareAdress(@RequestParam String placeId) {

        for (Adress a :adressRepository.findAll()) {
            if(a.getAdress() == placeId) {

                LOG.info("added referention to an old adress");
                return a;
            }
        }

            Adress adress = new Adress();
            adress.setAdress(placeId);

            adressRepository.save(adress);
            LOG.info("new adress created");
            return adress;

    }

    @RequestMapping(path = "/getAdress")
    public @ResponseBody Adress getAdress(@RequestParam Integer id) {
        for (Adress a :adressRepository.findAll()) {
            if(a.getId() == id) {

                return a;
            }
        }
        return null;
    }


}
